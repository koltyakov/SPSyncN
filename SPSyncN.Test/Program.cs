using SPAuthN;
using System;

namespace SPSyncN.Test
{
    class Program
    {
        static void Main(string[] args)
        {

            Options options = SPAuth.GetAuth("--configPath='./config/private.json' --forcePrompts=false");

            Console.WriteLine("Upload a file...");
            Upload.File("./Documents/TextFile.txt", "Shared Documents/File Upload Test", options.SiteUrl, options.AuthOptions);

            Console.WriteLine("Upload a folder...");
            Upload.Folder("./Documents", "Shared Documents/Folder Upload Test", options.SiteUrl, options.AuthOptions);

            var bp = ""; bp += "";

        }
    }
}
