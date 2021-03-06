# SPSyncN - SharePoint .Net assets sync via Node.js

[![NuGet version](https://img.shields.io/nuget/v/SPSyncN.svg)](https://www.nuget.org/packages/SPSyncN)
[![Downloads](https://img.shields.io/nuget/dt/SPSyncN.svg)](https://www.nuget.org/packages/SPSyncN)
![Build Status](https://koltyakov.visualstudio.com/SPNode/_apis/build/status/SPSyncN?branchName=master)
[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/sharepoint-node/Lobby)

---

The wrapper for:

- [spsave](https://www.npmjs.com/package/spsave)
- [sppull](https://www.npmjs.com/package/sppull)
- [sp-download](https://www.npmjs.com/package/sp-download)
- [sppurge](https://www.npmjs.com/package/sppurge)

for usage in .Net assemblies.

---

## Features

- Upload a file to SharePoint document library
- Upload a folder with structure and files to SharePoint
- Upload a folder with structure and files to SharePoint in incremental mode
- Download a file to SharePoint document library
- Download a folder with structure and files to SharePoint
- Remove a file from SharePoint document library
- Remove a folder with all content from SharePoint

## Installation

```PowerShell
Install-Package SPAuthN
Install-Package SPSyncN
```

## Usage

```CSharp
Options options = SPAuth.GetAuth("--configPath='./config/private.json' --forcePrompts=false");

Console.WriteLine("Upload a file...");
Upload.File("./Documents/TextFile.txt", "Shared Documents/File Upload Test", options.SiteUrl, options.AuthOptions);

Console.WriteLine("Download a file...");
Download.File("Shared Documents/File Upload Test/TextFile.txt", "./Download", options.SiteUrl, options.AuthOptions);

Console.WriteLine("Deleting a file...");
Remove.File("Shared Documents/File Upload Test/TextFile.txt", options.SiteUrl, options.AuthOptions);

Console.WriteLine("Upload a folder...");
Upload.Folder("./Documents", "Shared Documents/Folder Upload Test", options.SiteUrl, options.AuthOptions);

Console.WriteLine("Upload a folder (incremental mode)...");
Upload.FolderDiff("./Documents", "Shared Documents/Folder Upload Test", options.SiteUrl, options.AuthOptions);

Console.WriteLine("Download a folder...");
Download.Folder("Shared Documents/Folder Upload Test", "./Download", options.SiteUrl, options.AuthOptions);

Console.WriteLine("Deleting a folder...");
Remove.Folder("Shared Documents/Folder Upload Test", options.SiteUrl, options.AuthOptions);
```