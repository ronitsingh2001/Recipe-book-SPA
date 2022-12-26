import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from "rxjs";
import { AuthService } from "./auth.service";
import { User } from "./user.model";

@Injectable({ providedIn: 'root' })
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.userSubject.pipe(take(1),
            exhaustMap(user => {
                if (user) {
                    const newReq = req.clone({ params: new HttpParams().set('auth', user.token) })
                    return next.handle(newReq)
                }
                return next.handle(req)
            }))
    }
}