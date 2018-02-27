import * as fs from 'fs';
import * as path from 'path';
import { spsave, ICoreOptions, IFileContentOptions } from 'spsave';

import { utils } from './../utils';

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
