using EdgeJs;
using System.Threading.Tasks;
using SPSyncN.Properties;
using Newtonsoft.Json;

namespace SPSyncN
{
    public static class Upload
    {
        public static dynamic File(string FilePath, string SpFolder, string SiteUrl, dynamic Creds)
        {
            string credsJson = JsonConvert.SerializeObject(Creds).Replace("\"", "___###___");
            string args = $@"--filePath=""{FilePath}"" --spFolder=""{SpFolder}"" --siteUrl=""{SiteUrl}"" --creds=""{credsJson}""";
            dynamic result = FileTask(args).Result;
            return result;
        }

        public static dynamic Folder(string FolderPath, string SpFolder, string SiteUrl, dynamic Creds)
        {
            string credsJson = JsonConvert.SerializeObject(Creds).Replace("\"", "___###___");
            string args = $@"--folderPath=""{FolderPath}"" --spFolder=""{SpFolder}"" --siteUrl=""{SiteUrl}"" --creds=""{credsJson}""";
            dynamic result = FolderTask(args).Result;
            return result;
        }

        public static dynamic FolderDiff(string FolderPath, string SpFolder, string SiteUrl, dynamic Creds)
        {
            string credsJson = JsonConvert.SerializeObject(Creds).Replace("\"", "___###___");
            string args = $@"--folderPath=""{FolderPath}"" --spFolder=""{SpFolder}"" --siteUrl=""{SiteUrl}"" --diffUpload=""true"" --creds=""{credsJson}""";
            dynamic result = FolderTask(args).Result;
            return result;
        }

        private static async Task<object> FileTask(string args)
        {
            var func = Edge.Func(Resources.SPSyncN + "; return SPSyncN.uploadFile;");
            return await func(args);
        }

        private static async Task<object> FolderTask(string args)
        {
            var func = Edge.Func(Resources.SPSyncN + "; return SPSyncN.uploadFolder;");
            return await func(args);
        }

    }
}
