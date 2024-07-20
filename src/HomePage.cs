using System.Net;

namespace Files;

public class HomePage : BlobUserPage
{
    public override string Action { get => "method"; }

    public virtual string FileSystemType { get => "unix"; }

    protected override void EmptyPage()
    {
        var path = RequestPath;
        if (path.Length == 0 || path == "/")
        {
            if (IsAuthenticated)
                Include("pages/manager.html", true);
            else
                Include("pages/login.html", true);
            return;
        }
        var items = path.Split('/');
        if (items.Length != 4)
            return;
        var userName = items[1];
        var folder = items[2];
        var fileName = items[3];
        var security = App.Security as BlobUserSecurity;
        if (!security.FindUser(userName, out var user))
            return;
        var list = user.Files;
        BlobEntry file;
        lock (list)
            file = list.FirstOrDefault(f => f.Name == fileName);
        if (file == null)
            return;
        if (file.Type.Split('/')[0] + "s" != folder)
            return;
        if (User.Name == userName || file.Access == 1)
        {
            fileName = user.Path($"files/{fileName}");
            AuditPathTransmit(fileName, Request.Query.ContainsKey("download"));
        }
        else
            Response.StatusCode = (int)HttpStatusCode.NotFound;
    }

    void Recycle()
    {
        User.Counter = (User.Counter + 1) % 10;
        if (User.Counter > 0)
            return;
        var a = Tools.UnixTime(DateTime.Now.AddDays(-1));
        var folder = User.Path("incomming");
        var files = Directory.GetFiles(folder, ".tmp-*");
        foreach (var file in files)
        {
            var b = Tools.UnixTime(File.GetCreationTime(file));
            if (b < a)
                File.Delete(file);
        }
        var uploads = User.Uploads;
        var keys = uploads.Keys.ToList();
        foreach (var key in keys)
        {
            var upload = uploads[key];
            if (upload.Modified < a)
                uploads.Remove(key);
        }
    }

    BlobEntry Recall()
    {
        var key = Read("key");
        var uploads = User.Uploads;
        lock (uploads)
        {
            if (uploads.ContainsKey(key))
            {
                var current = uploads[key];
                current.Modified = Tools.UnixTime(DateTime.Now);
                return current;
            }
            Recycle();
            var upload = new BlobEntry
            {
                Key = key,
                Name = Read("name"),
                Size = Read<long>("size"),
            };
            uploads.Add(key, upload);
            return upload;
        }
    }

    void Reclaim(BlobEntry upload)
    {
        var uploads = User.Uploads;
        lock (uploads)
            uploads.Remove(upload.Key);
    }

    void Complete(BlobEntry upload)
    {
        var files = User.Files;
        lock (files)
        {
            var existing = files.FirstOrDefault(e => e.Key == upload.Key);
            if (existing is not null)
                files.Remove(existing);
            files.Add(upload);
            var s = JsonConvert.SerializeObject(files);
            File.WriteAllText(User.Path("profile/files.json"), s);
        }
    }

    public void ActionUpload()
    {
        var upload = Recall();
        var step = Read("step");
        switch (step)
        {
            case "abort":
                AuditUploadAbort(upload);
                Reclaim(upload);
                break;
            case "begin":
                AuditUploadBegin(upload);
                Write(upload.Offset);
                break;
            case "chunk":
                AuditUploadChunk(upload);
                break;
            case "end":
                AuditUploadComplete(upload);
                Reclaim(upload);
                Complete(upload);
                break;
        }
    }

    public void ActionAddUser()
    {
        if (!User.IsAdmin)
        {
            Write("Error");
            return;
        }
        var name = Read("name");
        var password = Read("password");
        if (password != Read("repeatPassword"))
        {
            Write("Error");
            return;
        }
        var security = App.Security as BlobUserSecurity;
        var added = security.AddUser(name, password);
        Write(added ? "OK" : "Error");
    }

    public void ActionContentType()
    {
        if (User.IsAnonymous)
            return;
        Write(Tools.MapContentType(Read("filename")));
    }

    public void ActionList()
    {
        Recycle();
        var data = "";
        var list = User.Files;
        lock (list)
            data = JsonConvert.SerializeObject(list);
        Write(data);
    }

    public void ActionDelete()
    {
        var keys = JsonConvert.DeserializeObject<string[]>(Read("keys"));
        var list = User.Files;
        lock (list)
        {
            foreach (var key in keys)
            {
                var index = list.FindIndex(e => e.Key == key);
                if (index < 0)
                    continue;
                var entry = list[index];
                list.RemoveAt(index);
                AudiFileDelete(entry);
            }
            var s = JsonConvert.SerializeObject(list);
            File.WriteAllText(User.Path("profile/files.json"), s);
        }
    }

    public void ActionRename()
    {
        var key = Read("key");
        var name = Read("name");
        if (name.Length < 1 || name.StartsWith('.') || name.ToLower() == "error")
        {
            Write("Error");
            return;
        }
        var list = User.Files;
        lock (list)
        {
            var entry = list.FirstOrDefault(e => e.Key == key);
            if (entry == null)
            {
                Write("Error");
                return;
            }
            var source = User.Path($"files/{entry.Name}");
            var ext = Path.GetExtension(source);
            name += ext;
            var dest = User.Path($"files/{name}");
            try
            {
                File.Move(source, dest);
                entry.Name = name;
                var s = JsonConvert.SerializeObject(list);
                File.WriteAllText(User.Path("profile/files.json"), s);
                Write(name);
            }
            catch
            {
                Write("Error");
                return;
            }
        }
    }

    public void ActionShare()
    {
        var keys = JsonConvert.DeserializeObject<string[]>(Read("keys"));
        var access = Read<int>("access");
        if (access < 0 || access > 1)
            access = 0;
        var list = User.Files;
        lock (list)
        {
            foreach (var key in keys)
            {
                var index = list.FindIndex(e => e.Key == key);
                if (index < 0)
                    continue;
                var entry = list[index];
                entry.Access = access;
            }
            var s = JsonConvert.SerializeObject(list);
            File.WriteAllText(User.Path("profile/files.json"), s);
        }
    }

    [Action("files")]
    public void MethodFiles()
    {
        if (User.IsAnonymous)
            return;
        var action = Read("action");
        switch (action)
        {
            case "adduser":
                ActionAddUser();
                break;
            case "contenttype":
                ActionContentType();
                break;
            case "list":
                ActionList();
                break;
            case "upload":
                ActionUpload();
                break;
            case "rename":
                ActionRename();
                break;
            case "share":
                ActionShare();
                break;
            case "delete":
                ActionDelete();
                break;
        }
    }

    string IncommingName(BlobEntry entry) => User.Path($"incomming/{entry.TempName}");
    string CompleteName(BlobEntry entry) => User.Path($"files/{entry.Name}");

    public void AuditUploadAbort(BlobEntry upload)
    {
        var incomming = IncommingName(upload);
        File.Delete(incomming);
    }

    public void AuditUploadBegin(BlobEntry upload)
    {
        var incomming = IncommingName(upload);
        if (upload.Offset == 0)
        {
            File.Delete(incomming);
            File.Create(incomming).Dispose();
        }
    }

    public void AuditUploadChunk(BlobEntry upload)
    {
        var incomming = IncommingName(upload);
        using var output = File.OpenWrite(incomming);
        output.Seek(0, SeekOrigin.End);
        using var stream = Request.Form.Files[0].OpenReadStream();
        upload.CopyTo(stream, output);
    }

    public void AuditUploadComplete(BlobEntry upload)
    {
        var incomming = IncommingName(upload);
        var complete = CompleteName(upload);
        File.Delete(complete);
        File.Move(incomming, complete);
    }

    public void AudiFileDelete(BlobEntry file)
    {
        var complete = CompleteName(file);
        File.Delete(complete);
    }

    public void AuditPathTransmit(string filePath, bool download)
    {
        TransmitFile(filePath, download);
    }
}