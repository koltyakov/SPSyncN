import * as fs from 'fs';
import * as path from 'path';
import { spsave, ICoreOptions, IFileContentOptions } from 'spsave';
import { Delete, IContext } from 'sppurge';

import { utils } from './utils';

import {
  IUploadFileParams, IUploadFolderParams,
  IRemoveFileParams, IRemoveFolderParams
} from './domain';

export const uploadFile = (args, callback) => {

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

export const uploadFolder = (args, callback) => {

  const params: IUploadFolderParams = utils.stringToArgvs(args);

  let coreOptions: ICoreOptions = {
    siteUrl: params.siteUrl,
    notification: false,
    checkin: true,
    checkinType: 1
  };

  const creds: any = JSON.parse(params.creds.replace(/___###___/g, '"'));

  (async () => {
    let files = utils.walkSync(params.folderPath);
    for (let file of files) {
      const fileOptions: IFileContentOptions = {
        folder: `${params.spFolder}/${path.dirname(path.relative(params.folderPath, file)).replace(/\\/g, '/')}`,
        fileName: path.basename(file),
        fileContent: fs.readFileSync(file)
      };
      await spsave(coreOptions, creds, fileOptions);
    }
  })()
    .then(response => {
      callback(null, response);
    })
    .catch(error => {
      callback(error, null);
    });

};

export const removeFile = (args, callback) => {

  const sppurge = new Delete();
  const params: IRemoveFileParams = utils.stringToArgvs(args);

  const creds: any = JSON.parse(params.creds.replace(/___###___/g, '"'));

  const context: IContext = {
    siteUrl: params.siteUrl,
    creds: creds
  };

  let webRelativeUrl = '/' + params.siteUrl.replace('://', '__').split('/').slice(1, 100).join('/');

  let filePath: string = (webRelativeUrl + params.spFilePath.replace(webRelativeUrl, '')).replace(/\/\//g, '/');

  console.log(filePath);

  sppurge.deleteFile(context, filePath)
    .then(response => {
      callback(null, response);
    })
    .catch(error => {
      callback(error, null);
    });

};

export const removeFolder = (args, callback) => {

  const sppurge = new Delete();
  const params: IRemoveFolderParams = utils.stringToArgvs(args);

  const creds: any = JSON.parse(params.creds.replace(/___###___/g, '"'));

  const context: IContext = {
    siteUrl: params.siteUrl,
    creds: creds
  };

  let webRelativeUrl = '/' + params.siteUrl.replace('://', '__').split('/').slice(1, 100).join('/');

  let folderPath: string = (webRelativeUrl + params.spFolderPath.replace(webRelativeUrl, '')).replace(/\/\//g, '/');

  sppurge.deleteFolder(context, folderPath)
    .then(response => {
      callback(null, response);
    })
    .catch(error => {
      callback(error, null);
    });

};
