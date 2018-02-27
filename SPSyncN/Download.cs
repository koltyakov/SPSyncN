using EdgeJs;
using System.Threading.Tasks;
using SPSyncN.Properties;
using Newtonsoft.Json;

namespace SPSyncN
{
    public static class Download
    {
        public static dynamic File(string SpFilePath, string SaveToPath, string SiteUrl, dynamic Creds)
        {
            string credsJson = JsonConvert.SerializeObject(Creds).Replace("\"", "___###___");
            string args = $@"--spFilePath=""{SpFilePath}"" --saveToPath=""{SaveToPath}"" --siteUrl=""{SiteUrl}"" --creds=""{credsJson}""";
            dynamic result = FileTask(args).Result;
            return result;
        }

        public static dynamic Folder(string SpFolderPath, string SaveToPath, string SiteUrl, dynamic Creds)
        {
            string credsJson = JsonConvert.SerializeObject(Creds).Replace("\"", "___###___");
            string args = $@"--spRootFolder=""{SpFolderPath}"" --dlRootFolder=""{SaveToPath}"" --siteUrl=""{SiteUrl}"" --creds=""{credsJson}""";
            dynamic result = FolderTask(args).Result;
            return result;
        }

        private static async Task<object> FileTask(string args)
        {
            var func = Edge.Func(Resources.SPSyncN + "; return SPSyncN.downloadFile;");
            return await func(args);
        }

        private static async Task<object> FolderTask(string args)
        {
            var func = Edge.Func(Resources.SPSyncN + "; return SPSyncN.downloadFolder;");
            return await func(args);
        }

    }
}
