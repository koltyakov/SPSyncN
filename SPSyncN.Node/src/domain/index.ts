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
