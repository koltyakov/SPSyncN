import { ISPRequest, create as createRequest } from 'sp-request';

export interface IFolderProcessItem {
  path: string;
  processed?: boolean;
}

export interface IFileProcessItem {
  path: string;
  relativePath?: string;
  length?: number;
  processed?: boolean;
}

export interface IFilesInfoSettings {
  siteUrl: string;
  spFolder: string;
  creds: any;
}

export default class FilesInfo {

  private settings: IFilesInfoSettings;
  private spr: ISPRequest;

  constructor (settings: IFilesInfoSettings) {
    this.settings = settings;
    this.spr = createRequest(this.settings.creds);
  }

  public getAllFilesInFolderInfo = (foldersArr: IFolderProcessItem[] = [], filesArr: IFileProcessItem[] = []): Promise<IFileProcessItem[]> => {
    return this.getServerRelativeUrl().then(serverRelativeUrl => {
      if (foldersArr.length === 0) {
        foldersArr.push({
          path: `${serverRelativeUrl}/${this.settings.spFolder}`.replace(/\/\//g, '/'),
          processed: false
        });
      }
      if (foldersArr.filter(folder => !folder.processed).length === 0) {
        return filesArr;
      } else {
        let folder = foldersArr.find(folder => !folder.processed);

        let requestUrl = `${this.settings.siteUrl}` +
          `/_api/web/getFolderByServerRelativeUrl('${folder.path}')?` +
            `$select=Files,Folders/ServerRelativeUrl,Folders/ItemCount&` +
            `$expand=Files,Folders`;
        this.spr.get(requestUrl, {
          headers: {
            'Accept': 'application/json; odata=verbose',
            'Content-Type': 'application/json; odata=verbose'
          }
        }).then(content => {
          folder.processed = true;
          filesArr = filesArr.concat(content.body.d.Files.results.map(fileResp => {
            return {
              path: fileResp.ServerRelativeUrl,
              relativePath: fileResp.ServerRelativeUrl.replace(`${serverRelativeUrl}/${this.settings.spFolder}/`.replace(/\/\//g, '/'), ''),
              length: parseInt(fileResp.Length, 10)
            };
          }));
          foldersArr = foldersArr.concat(content.body.d.Folders.results.map(folderResp => {
            return {
              path: folderResp.ServerRelativeUrl,
              processed: folderResp.ItemCount === 0
            };
          }));
          return this.getAllFilesInFolderInfo(foldersArr, filesArr);
        });
      }
    });
  }

  private getServerRelativeUrl = (): Promise<string> => {
    return new Promise(resolve => {
      if (typeof global['serverRelativeUrl'] !== 'undefined') {
        resolve(global['serverRelativeUrl']);
      } else {
        let requestUrl = `${this.settings.siteUrl}/_api/web?$select=ServerRelativeUrl`;
        this.spr.get(requestUrl, {
          headers: {
            'Accept': 'application/json; odata=verbose',
            'Content-Type': 'application/json; odata=verbose'
          }
        }).then(webProps => {
          global['serverRelativeUrl'] = webProps.body.d.ServerRelativeUrl;
          resolve(webProps.body.d.ServerRelativeUrl);
        });
      }
    });
  }

}
