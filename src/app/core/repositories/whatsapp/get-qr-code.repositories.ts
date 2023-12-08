import { Observable } from 'rxjs';
import { QrCodeInterface } from '../../data/repository/whatsapp/qr-code.entity';
export abstract class GetQrCodeRepositories {
  abstract getQrCode(param: any): Observable<QrCodeInterface>;
}
