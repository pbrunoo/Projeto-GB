import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UseCase } from "../../base/base-usecase";
import { responsibleModelR } from "../../model/reponsible/reponsible.model";
import { GetResponsibleRepositorie } from "../../repositories/responsible/responsible.repositorie";

@Injectable({
    providedIn: 'root'
})

export class GetResponsibleUseCases implements UseCase<any, responsibleModelR>{
    constructor(private getResponsibles: GetResponsibleRepositorie){}

    execute(): Observable<responsibleModelR> {
        return this.getResponsibles.getResponsibles();
    }
}