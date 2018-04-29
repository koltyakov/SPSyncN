using SPAuthN;
using System;

namespace SPSyncN.Test
{
    class Program
    {
        static void Main(string[] args)
        {

            Options options = SPAuth.GetAuth("--configPath='./config/private.json' --forcePrompts=false");

            Console.WriteLine("\n=== Upload a file... ===\n");
            Upload.File("./Documents/TextFile.txt", "Shared Documents/File Upload Test", options.SiteUrl, options.AuthOptions);

            Console.WriteLine("\n=== Download a file... ===\n");
            Download.File("Shared Documents/File Upload Test/TextFile.txt", "./Download", options.SiteUrl, options.AuthOptions);

            Console.WriteLine("\n=== Deleting a file... ===\n");
            Remove.File("Shared Documents/File Upload Test/TextFile.txt", options.SiteUrl, options.AuthOptions);

            Console.WriteLine("\n=== Upload a folder... ===\n");
            Upload.Folder("./Documents", "Shared Documents/Folder Upload Test", options.SiteUrl, options.AuthOptions);

            Console.WriteLine("\n=== Upload a folder (incremental mode)... ===\n");
            Upload.FolderDiff("./Documents", "Shared Documents/Folder Upload Test", options.SiteUrl, options.AuthOptions);

            Console.WriteLine("\n=== Download a folder... ===\n");
            Download.Folder("Shared Documents/Folder Upload Test", "./Download", options.SiteUrl, options.AuthOptions);

            Console.WriteLine("\n=== Deleting a folder... ===\n");
            Remove.Folder("Shared Documents/Folder Upload Test", options.SiteUrl, options.AuthOptions);

            var bp = ""; bp += "";

        }
    }
}
