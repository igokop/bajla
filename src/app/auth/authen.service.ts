import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { AuthService } from "../auth.service";
import { User } from "./user.model";
import {environment} from "../../environments/environment"
export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;


}

@Injectable({providedIn: 'root'})
export class AuthentService {
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    constructor(private http:HttpClient, private router:Router, private authService: AuthService){}

    signUp(email: string, password: string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleError),tap(resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            }
        ))
    };

    logIn(email: string, password: string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);  
            })
        );
    }

    private handleAuthentication(email: string, localId: string, idToken: string, expiresIn: number){
        const expirationDate = new Date(new Date().getTime() + +expiresIn *1000);
                const user = new User(email, localId, idToken, expirationDate );
                this.user.next(user);
                localStorage.setItem('userData', JSON.stringify(user));
                this.autoLogout(expiresIn*1000);
                
    }

    private handleError(errorRes: HttpErrorResponse){
        let errorMessage = 'An unknown error occured';
        if(!errorRes.error || !errorRes.error.error)
        {
            return throwError(errorMessage);
        }
        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exist already!'
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This users doesnt exist!'
        }
        return throwError(errorMessage);
    }

    autoLogin(){
        const userData = JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return;
        }
        this.authService.login();
        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );

        if(loadedUser.getToken()){
            this.user.next(loadedUser);
            const expirationDuration = new Date (userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
        this.router.navigate(['/home']);
    }

    logout(){
        this.user.next(null); 
        this.router.navigate(['/']);
        this.authService.logout();
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer)
        {
            this.tokenExpirationTimer = null;
        }
    }

    autoLogout(expirationDuration: number){
        this.tokenExpirationTimer = setTimeout(() => {this.logout()},expirationDuration);
    }
    
}
