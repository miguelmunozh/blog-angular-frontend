import {Injectable} from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { AuthService } from './auth/shared/auth.service';
import { Router } from '@angular/router';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
    constructor(public authService : AuthService, private router : Router){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const jwtToken = this.authService.getJwtToken();
        if(jwtToken){
            const cloned = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + jwtToken)
            });

            return next.handle(cloned).pipe(
                retry(1),
                catchError(returnedError  => {
                if (returnedError instanceof HttpErrorResponse) {
                    if(returnedError.status === 401){
                        this.handleAuthError();
                    }
                }
                return Observable.throw(returnedError.statusText);

            }
            ));
        // here we can catch the unahotorized error if the token has expired
    }
    return next.handle(req)
}

    private handleAuthError() {
        this.authService.logout();
        this.router.navigateByUrl('log-in');
      }
}