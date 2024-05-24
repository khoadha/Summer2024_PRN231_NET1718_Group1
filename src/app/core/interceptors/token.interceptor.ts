import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { TokenApiModel } from '../models/token-api.model';
import { MessageService } from 'primeng/api';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private router: Router, private messageService: MessageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.auth.getToken();

    if(myToken){
      request = request.clone({
        setHeaders: {
          Authorization:'bearer ' + myToken
        }
      })
    }
    return next.handle(request).pipe(
      catchError((err:any) => {
        if(err instanceof HttpErrorResponse) {
          if(err.status === 400){
            if(err.error.message === 'TokenExpired'){
              this.auth.logOut();
            } else {
              this.showError(err.error.errors[0]);
            }
          }
            else if(err.status === 401) {
              return this.handleUnauthorizedError(request, next);
            }
        }
        return throwError(() => Error("An error occurred while processing your request!"));
      })
    );
  }

  handleUnauthorizedError(req: HttpRequest<any>, next: HttpHandler){
     let tokenApiModel = new TokenApiModel();
     tokenApiModel.accessToken = this.auth.getToken()!;
     tokenApiModel.refreshToken = this.auth.getRefreshToken()!;
     return this.auth.renewToken(tokenApiModel)
     .pipe(
      switchMap((data:TokenApiModel) => {
        this.auth.storeRefreshToken(data.refreshToken);
        this.auth.storeToken(data.accessToken);
        req = req.clone({
          setHeaders: {
            Authorization: 'bearer ' + data.accessToken
          }
        })
        return next.handle(req);
      }),
      catchError((err)=> {
        return throwError(()=> {
          this.router.navigate(['sign-in']);
          window.location.reload();
        }) 
      })
     )
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
 }
}
