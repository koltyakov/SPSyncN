import { Delete, IContext } from 'sppurge';

import { utils } from './../utils';

import { IRemoveFileParams, IRemoveFolderParams } from './../domain';

export const removeFile = (args: string, callback: (err: any, res: any) => void) => {

  const sppurge = new Delete();
  const params: IRemoveFileParams = utils.stringToArgvs(args);

  const creds: any = JSON.parse(params.creds.replace(/___###___/g, '"'));

  const context: IContext = {
    siteUrl: params.siteUrl,
    creds
  };

  let webRelativeUrl = '/' + params.siteUrl.replace('://', '__').split('/').slice(1, 100).join('/');

  let filePath: string = (webRelativeUrl + '/' + params.spFilePath.replace(webRelativeUrl, '')).replace(/\/\//g, '/');

  sppurge.deleteFile(context, filePath)
    .then(response => {
      if (response.statusCode === 200) {
        console.log('File has been deleted:', filePath);
      } else {
        console.log(response.statusCode, response.statusMessage);
      }
      callback(null, {
        filePath,
        statusCode: response.statusCode,
        statusMessage: response.statusMessage
      });
    })
    .catch(error => {
      callback(error, null);
    });

};

export const removeFolder = (args: string, callback: (err: any, res: any) => void) => {

  const sppurge = new Delete();
  const params: IRemoveFolderParams = utils.stringToArgvs(args);

  const creds: any = JSON.parse(params.creds.replace(/___###___/g, '"'));

  const context: IContext = {
    siteUrl: params.siteUrl,
    creds
  };

  let webRelativeUrl = '/' + params.siteUrl.replace('://', '__').split('/').slice(1, 100).join('/');

  let folderPath: string = (webRelativeUrl + '/' + params.spFolderPath.replace(webRelativeUrl, '')).replace(/\/\//g, '/');

  sppurge.deleteFolder(context, folderPath)
    .then(response => {
      if (response.statusCode === 200) {
        console.log('Folder has been deleted:', folderPath);
      } else {
        console.log(response.statusCode, response.statusMessage);
      }
      callback(null, {
        folderPath,
        statusCode: response.statusCode,
        statusMessage: response.statusMessage
      });
    })
    .catch(error => {
      callback(error, null);
    });

};
