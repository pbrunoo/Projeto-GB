import { Component, EventEmitter, Output } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { UploaderImageInstancePathEnum } from './uploader-image.enum';
import {
  switchMap,
  from,
  throwError,
  Observable,
  firstValueFrom,
  map,
} from 'rxjs';
import { IResponseGetUrlSigned } from './uploader-image.type';

const MAX_SIZE = 2000000;

@Component({
  selector: 'gb-uploader-image',
  template: `
    <input
      type="file"
      multiple
      (change)="uploadFiles($event)"
      style="display: none"
      #FileInput
    />
    <button
      type="button"
      class="btn btn-light upload-btn"
      (click)="FileInput.click()"
      [disabled]="loading"
    >
      <i
        class="icon-clip anexo"
        placement="end"
        ngbTooltip="Adicionar anexo"
      ></i>
    </button>
  `,
  styles: [
    `
      .upload-btn {
        color: #777986;
        font-size: 24px!important;
        padding: 0 6px !important;
        background: transparent !important;
      }
    `,
  ],
})
export class UploaderImageComponent {
  @Output() newFile: EventEmitter<string> = new EventEmitter();

  loading: boolean = false;

  constructor(private readonly imageService: ImageService) {}

  upload(file: File) {
    let fileName = file.name;
    let url: any;
    return firstValueFrom(
      this.imageService
        .getSignedUrlPromise({
          fileName,
          instance: UploaderImageInstancePathEnum.TICKET,
          size: file.size,
        })
        .pipe(
          switchMap(async (res: IResponseGetUrlSigned) => {
            console.log(res);
            if (res.uploadURL && res.urlImage && res.key && res.contentType) {
              fileName = res.key;
              url = res.urlImage;
              return from(
                await this.imageService.upload(
                  res?.uploadURL,
                  file,
                  res.contentType
                )
              );
            } else {
              return throwError(() => ({
                error: { message: 'Falha ao realizar o upload' },
              }));
            }
          }),
          switchMap((value: Observable<any>) => {
            return value;
          }),
          map(() => url)
        )
    );
  }

  uploadFiles(event: any): void {
    const uploads = [];
    this.loading = true;

    for (let i = 0; i < event?.target?.files.length; i++) {
      uploads.push(this.upload(event?.target?.files[i]));
    }

    Promise.all(uploads)
      .then((res: string[]) => {
        res.map((url: string) => this.newFile.emit(url));
        this.loading = false;
      })
      .catch((err) => {
        console.error('Error in upload image', err);
        this.loading = false;
      });
  }
}
