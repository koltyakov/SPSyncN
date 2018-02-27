import { ISPPullOptions, ISPPullContext, Download as IDownload } from 'sppull';
import { Download } from 'sp-download';

const Pull: IDownload = require('sppull');
const sppull = Pull.sppull;

import { utils } from './../utils';

import { IDownloadFileParams, IDownloadFolderParams } from './../domain';

export const downloadFile = (args: string, callback: (err: any, res: any) => void) => {

  const params: IDownloadFileParams = utils.stringToArgvs(args);
  const creds: any = JSON.parse(params.creds.replace(/___###___/g, '"'));
  const download = new Download(creds);

  download.downloadFileFromSite(params.siteUrl, params.spFilePath, params.saveToPath)
    .then(response => {
      callback(null, response);
    })
    .catch(error => {
      callback(error, null);
    });

};

export const downloadFolder = (args: string, callback: (err: any, res: any) => void) => {

  const params: IDownloadFolderParams = utils.stringToArgvs(args);
  const creds: any = JSON.parse(params.creds.replace(/___###___/g, '"'));

  const pullContext: ISPPullContext = {
    siteUrl: params.siteUrl,
    ...creds
  };

  const pullOptions: ISPPullOptions = {
    spRootFolder: params.spRootFolder,
    dlRootFolder: params.dlRootFolder
  };

  sppull(pullContext, pullOptions)
    .then(response => {
      callback(null, response);
    })
    .catch(error => {
      callback(error, null);
    });

};
