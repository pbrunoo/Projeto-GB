import { UploaderImageInstancePathEnum } from './uploader-image.enum';

export interface IQueryGetUrlSigned {
  fileName: string;
  instance: UploaderImageInstancePathEnum;
  size: number;
}

export interface IConfigUploaderImage {
  environmentUploadUrl: string;
  instance?: string;
}

export interface IResponseGetUrlSigned {
  uploadURL: string;
  key: string;
  contentType: string;
  urlImage: string;
}
