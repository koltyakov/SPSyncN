import * as fs from 'fs';
import * as path from 'path';
import { spsave, ICoreOptions, IFileContentOptions } from 'spsave';

import { utils } from './../utils';
import FilesInfo, { IFileProcessItem } from './../utils/filesInfo';

import { IUploadFileParams, IUploadFolderParams } from './../domain';

export const uploadFile = (args: string, callback: (err: any, res: any) => void) => {

  const params: IUploadFileParams = utils.stringToArgvs(args);

  let coreOptions: ICoreOptions = {
    siteUrl: params.siteUrl,
    notification: false,
    checkin: true,
    checkinType: 1
  };

  const creds: any = JSON.parse(params.creds.replace(/___###___/g, '"'));

  const fileOptions: IFileContentOptions = {
    folder: `${params.spFolder}`,
    fileName: path.basename(params.filePath),
    fileContent: fs.readFileSync(params.filePath)
  };

  spsave(coreOptions, creds, fileOptions)
    .then(response => {
      callback(null, response);
    })
    .catch(error => {
      callback(error, null);
    });

};

export const uploadFolder = (args: string, callback: (err: any, res: any) => void) => {

  const params: IUploadFolderParams = utils.stringToArgvs(args);

  const coreOptions: ICoreOptions = {
    siteUrl: params.siteUrl,
    notification: false,
    checkin: true,
    checkinType: 1
  };

  const creds: any = JSON.parse(params.creds.replace(/___###___/g, '"'));

  (async () => {
    let files = utils.walkSync(params.folderPath);
    let ignoredFiles: string[] = [];
    let remoteFiles: IFileProcessItem[] = [];

    if (params.diffUpload) {
      const filesInfo = new FilesInfo({
        siteUrl: params.siteUrl,
        spFolder: params.spFolder,
        creds
      });
      remoteFiles = await filesInfo.getAllFilesInFolderInfo();
    }

    for (const file of files) {
      const fileContent = fs.readFileSync(file);
      let ignoreUpload = false;

      if (remoteFiles.length > 0) {
        const fileRelativePath = path.relative(params.folderPath, file).replace(/\\/g, '/');
        const remoteFile = remoteFiles.filter(file => {
          return file.relativePath === fileRelativePath;
        });
        if (remoteFile.length === 1) {
          // Same size
          if (remoteFile[0].length === fileContent.byteLength) {
            ignoreUpload = true;
            ignoredFiles.push(path.basename(file));
          }
        }
      }

      if (!ignoreUpload) {
        const fileOptions: IFileContentOptions = {
          folder: `${params.spFolder}/${path.dirname(path.relative(params.folderPath, file)).replace(/\\/g, '/')}`,
          fileName: path.basename(file),
          fileContent
        };
        await Promise.resolve(spsave(coreOptions, creds, fileOptions));
      }
    }

    if (params.diffUpload) {
      console.log(`Ignored files count: ${ignoredFiles.length}`);
    }

  })()
    .then(response => {
      callback(null, response);
    })
    .catch(error => {
      callback(error, null);
    });

};
