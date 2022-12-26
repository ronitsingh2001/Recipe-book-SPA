import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, Subject, tap, throwError } from "rxjs";
import { User } from "./user.model";

export interface authResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    userSubject = new BehaviorSubject<User|any>(null);
    

    constructor(private http: HttpClient,
        private router:Router) { }

    signup(email: string, password: string) {
        return this.http.post<authResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAhSID0ctgssF3YhHgOD-1qxlpDvXAsHNo',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError),
            tap(responseData => {
                this.handleAuthentication(responseData.email,
                    responseData.localId,
                    responseData.idToken,
                    responseData.expiresIn)
            }))
    }

    login(email: string, password: string) {
        return this.http.post<authResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAhSID0ctgssF3YhHgOD-1qxlpDvXAsHNo',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError),
            tap(responseData => {
                this.handleAuthentication(responseData.email,
                    responseData.localId,
                    responseData.idToken,
                    responseData.expiresIn)
            }))
    }

    logout(){
        this.userSubject.next(null);
        this.router.navigate(['./auth'])
    }


    private handleError(error: HttpErrorResponse) {
        let errorMes = 'An unknown error occurred!';
        if (!error.error || !error.error.error) {
            return throwError(errorMes)
        }
        switch (error.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMes = 'This Email exists already!'
                break;
            case 'EMAIL_NOT_FOUND':
                errorMes = 'This Email does not exists!'
                break;
        }
        return throwError(errorMes)
    }

    private handleAuthentication(
        email: string,
        id: string,
        token: string,
        expiresIn: string
    ) {
        const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
        const user = new User(
            email,
            id,
            token,
            expirationDate)

        this.userSubject.next(user);
    }
}