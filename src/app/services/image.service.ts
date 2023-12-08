import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IQueryGetUrlSigned,
  IResponseGetUrlSigned,
} from '../components/uploader-image/uploader-image.type';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private readonly http: HttpClient) {}

  getSignedUrlPromise(
    queryParams: IQueryGetUrlSigned
  ): Observable<IResponseGetUrlSigned> {
    return this.http.get(`${environment.URLBase}images/signed-url`, {
      params: new HttpParams({
        fromObject: {
          fileName: queryParams.fileName,
          instance: queryParams.instance,
          size: queryParams.size,
        },
      }),
    }) as Observable<IResponseGetUrlSigned>;
  }

  async upload(uploadUrl: string, file: File, contentType: string) {
    const arrayBuffer = await file.arrayBuffer();
    const blob = new Blob([new Uint8Array(arrayBuffer)], { type: file.type });

    const headers = new HttpHeaders();
    headers.set('content-type', contentType);
    headers.set('Access-Control-Allow-Origin', '*');

    return this.http.put(uploadUrl, blob, {
      reportProgress: true,
      headers,
    });
  }
}
