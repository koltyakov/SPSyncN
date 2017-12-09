# SPSyncN - SharePoint .Net assets sync via Node.js

[![NuGet version](https://img.shields.io/nuget/v/SPSyncN.svg)](https://www.nuget.org/packages/SPSyncN)
[![Downloads](https://img.shields.io/nuget/dt/SPSyncN.svg)](https://www.nuget.org/packages/SPSyncN)
[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/sharepoint-node/Lobby)

---

The wrapper for [spsave](https://www.npmjs.com/package/spsave) for usage in .Net assemblies.

---

Hey! Attention, please! On the first place, it is a crazy experiment which solves one of our very specific tasks for a frontier technology stack with SharePoint/Node.js/.Net where we need running the same exactly auth mechanisms which we use in Node.js but in .Net applications. We know exactly what we're doing and why. Please use the lib only in the case when native .Net credentials strategies do not suite your app.

## Installation

```PowerShell
Install-Package SPAuthN
Install-Package SPSyncN
```

## Usage

```CSharp
Options options = SPAuth.GetAuth("--configPath='./config/private.json'");

Console.WriteLine("Upload a file...");
Upload.File("./Documents/TextFile.txt", "Shared Documents/File Upload Test", options.SiteUrl, options.AuthOptions);

Console.WriteLine("Upload a folder...");
Upload.Folder("./Documents", "Shared Documents/Folder Upload Test", options.SiteUrl, options.AuthOptions);
```

[See more on GitHub](https://github.com/koltyakov/SPSyncN)