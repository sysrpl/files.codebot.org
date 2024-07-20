global using Codebot.Web;
global using Newtonsoft.Json;

namespace Files;

static class Program
{
    static void DoProcessRequest(ContextEventArgs args)
    {
        var context = args.Context;
        if (!context.Request.QueryString.HasValue)
        {
            // This allows css, scripts, and images to be served
            var s = context.Request.Path.Value ?? string.Empty;
            if (File.Exists(App.MapPath(s)))
                return;
        }
        // This allows files to be shared that are not in wwwroot
        args.Handler = new HomePage();
        args.Handled = true;
    }

    static void Main(string[] args)
    {
        App.OnStart += UserDefaults.DoStart;
        App.OnProcessRequest += DoProcessRequest;
        App.UseSecurity(new BlobUserSecurity());
        App.Run(args);
    }
}