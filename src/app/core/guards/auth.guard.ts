import { Injectable, EventEmitter } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate, CanLoad {

  public showElementsEmitter = new EventEmitter<boolean>();
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
     return this.verifyAccess();
  }

  private verifyAccess() {
    if(sessionStorage.getItem('ads_help_desk') && localStorage.getItem('ads_help_desk')) {
      this.showElementsEmitter.emit(true);
      return true;
    }

    this.showElementsEmitter.emit(false);
    this.router.navigate(['/auth']);
    return false;
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.verifyAccess();
  }
}
