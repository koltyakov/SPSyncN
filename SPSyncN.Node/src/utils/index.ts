import * as fs from 'fs';
import * as path from 'path';
import * as stringArgv from 'string-argv';

export class Utils {

  public walkSync = (dir: string, filelist: string[] = []): string[] => {
    let files: string[] = fs.readdirSync(dir);
    files.forEach(file => {
      let filePath: string = path.join(dir, file);
      if (fs.statSync(filePath).isDirectory()) {
        filelist = this.walkSync(filePath, filelist);
      } else {
        filelist.push(filePath);
      }
    });
    return filelist;
  }

  public stringToArgvs = (args) => {
    return stringArgv(args).reduce((res, arg) => {
      let argV = this.splitByFirst(arg, '=');
      if (argV.length === 0) {
        argV = this.splitByFirst(arg, ' ');
      }
      argV[0] = this.trimBy(argV[0], '-');
      if (argV.length === 1) {
        argV.push(true);
      } else {
        argV[1] = this.trimBy(argV[1], '"');
        argV[1] = this.trimBy(argV[1], '\'');
      }
      argV[0].split('.').reduce((res, prop, index, arr) => {
        if (arr.length === index + 1) {
          if (!isNaN(parseInt(argV[1], 10))) {
            argV[1] = parseInt(argV[1], 10);
          } else if (argV[1].toLowerCase() === 'true') {
            argV[1] = true;
          } else if (argV[1].toLowerCase() === 'false') {
            argV[1] = false;
          }
          res[prop] = argV[1];
        } else {
          res[prop] = res[prop] || {};
        }
        return res[prop];
      }, res);
      return res;
    }, {});
  }

  private splitByFirst = (input, splitBy) => {
    let inArr = input.split(splitBy);
    if (inArr.length === 1) {
      return inArr;
    }
    return [inArr[0], inArr.splice(1, 100).join(splitBy)];
  }

  private trimBy = (s, mask) => {
    while (~mask.indexOf(s[0])) {
      s = s.slice(1);
    }
    while (~mask.indexOf(s[s.length - 1])) {
      s = s.slice(0, -1);
    }
    return s;
  }

}

export const utils = new Utils();
