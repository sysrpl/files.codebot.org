namespace Files;

public class BlobUser : BasicUser
{
    string root = null;
    List<BlobEntry> files = null;
    Dictionary<string, BlobEntry> uploads = null;

    void Init()
    {
        if (root is not null)
            return;
        root = App.AppPath($"private/storage/{Name}");
        Directory.CreateDirectory(root);
        Directory.CreateDirectory(Path("profile"));
        Directory.CreateDirectory(Path("incomming"));
        Directory.CreateDirectory(Path("files"));
        var f = Path("profile/files.json");
        var s = "[]";
        if (File.Exists(f))
            s = File.ReadAllText(f);
        files = JsonConvert.DeserializeObject<List<BlobEntry>>(s);
        uploads = [];
    }

    public List<BlobEntry> Files { get { Init(); return files; } }
    public Dictionary<string, BlobEntry> Uploads { get { Init(); return uploads; } }
    public int Counter { get; set; }

    public BlobUser()
    {
        Counter = 0;
    }

    public string Path(string s)
    {
        return System.IO.Path.Combine(root, s);
    }
}

public class BlobUserPage : FileUserPage<BlobUser> { }
public class BlobUserSecurity : FileUserSecurity<BlobUser> { }
