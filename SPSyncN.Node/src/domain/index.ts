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
}

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
