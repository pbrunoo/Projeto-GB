import { Observable } from 'rxjs';
import { responsibleModelR } from '../../model/reponsible/reponsible.model';


export abstract class GetResponsibleRepositorie{
    abstract getResponsibles(): Observable<responsibleModelR>;
}