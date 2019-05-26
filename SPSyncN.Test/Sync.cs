using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Net;
using System.IO;
using SPAuthN;

namespace SPSyncN.Tests
{
    [TestClass]
    public class Sync
    {
        [TestMethod]
        public void CanSyncFiles()
        {
            Options options = Helpers.GetAuthOptions();

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
        }
    }
}
