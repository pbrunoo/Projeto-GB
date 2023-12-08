import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { QrCodeInterface } from './qr-code.entity';
import { getHeader } from "src/app/core/base/headers";

@Injectable({providedIn:'root'})

export class GetQrCodeRepository {
  getHeaders = {
    headers: getHeader()
}

  constructor(private http: HttpClient) {}

  getQrCode(param: any): Observable<QrCodeInterface> {
    return this.http.get<QrCodeInterface>(`https://api-whatsapp-suporte.grupoparceirobrasil.com.br/whatsapp/${param}`, this.getHeaders);
  }
}
