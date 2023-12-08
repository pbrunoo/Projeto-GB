import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { getHeader } from "src/app/core/base/headers";
import { responsibleModelR } from "src/app/core/model/reponsible/reponsible.model";
import { GetResponsibleRepositorie } from "src/app/core/repositories/responsible/responsible.repositorie";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class ResponsiblesDataRepository extends GetResponsibleRepositorie {

    getHeaders = {
        headers: getHeader()
    } 
    
    constructor(private http: HttpClient){ super(); }

    getResponsibles(): Observable<responsibleModelR> {
        return this.http.get<responsibleModelR>(`${environment.URLBase}user/all`, this.getHeaders)
            .pipe(map((rs: any) =>{
                let dataMap: any = [];
                rs.forEach((e:any) => {
                    dataMap.push({
                        id: e.id,
                        email: e.email,
                        password: e.password,
                        name: e.name,
                        type: e.type,
                        selected: false
                      })
                });
                return dataMap;
            }));
    }

}