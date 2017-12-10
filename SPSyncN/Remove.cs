using EdgeJs;
using System.Threading.Tasks;
using SPSyncN.Properties;
using Newtonsoft.Json;

namespace SPSyncN
{
    public static class Remove
    {
        public static dynamic File(string SpFilePath, string SiteUrl, dynamic Creds)
        {
            string credsJson = JsonConvert.SerializeObject(Creds).Replace("\"", "___###___");
            string args = $@"--spFilePath=""{SpFilePath}"" --siteUrl=""{SiteUrl}"" --creds=""{credsJson}""";
            dynamic result = FileTask(args).Result;
            return result;
        }

        public static dynamic Folder(string SpFolderPath, string SiteUrl, dynamic Creds)
        {
            string credsJson = JsonConvert.SerializeObject(Creds).Replace("\"", "___###___");
            string args = $@"--spFolderPath=""{SpFolderPath}"" --siteUrl=""{SiteUrl}"" --creds=""{credsJson}""";
            dynamic result = FolderTask(args).Result;
            return result;
        }

        private static async Task<object> FileTask(string args)
        {
            var func = Edge.Func(Resources.SPSyncN + "; return SPSyncN.removeFile;");
            return await func(args);
        }

        private static async Task<object> FolderTask(string args)
        {
            var func = Edge.Func(Resources.SPSyncN + "; return SPSyncN.removeFolder;");
            return await func(args);
        }

    }
}
