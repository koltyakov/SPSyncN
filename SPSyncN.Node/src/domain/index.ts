/* Upload */

export interface IUploadParams {
  siteUrl: string;
  spFolder: string;
  creds: string;
}

export interface IUploadFileParams extends IUploadParams {
  filePath: string;
}

export interface IUploadFolderParams extends IUploadParams {
  folderPath: string;
  diffUpload?: boolean;
}

/* Download */

export interface IDownloadParams {
  siteUrl: string;
  creds: string;
}

export interface IDownloadFileParams extends IDownloadParams {
  spFilePath: string;
  saveToPath: string;
}

export interface IDownloadFolderParams extends IDownloadParams {
  spRootFolder: string;
  dlRootFolder: string;
}

/* Remove */

export interface IRemoveParams {
  siteUrl: string;
  creds: string;
}

export interface IRemoveFileParams extends IRemoveParams {
  spFilePath: string;
}

export interface IRemoveFolderParams extends IRemoveParams {
  spFolderPath: string;
}
