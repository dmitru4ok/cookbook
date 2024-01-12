import { Actions, createEffect, ofType } from "@ngrx/effects";
import { authenticateSuccess, authenticateError, loginRequestStart, logout, signupRequestStart, autoLogin } from "./auth.actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/auth/user.model";
import { AuthService } from "src/app/auth/auth.service";

interface AuthResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    kind: string;
    registered?: string;
}

const MILISECONDS_IN_SEC = 1000;

const handleAuthentication = (response: AuthResponse) => {
    const expirationDate = new Date(new Date().getTime() + +response.expiresIn * MILISECONDS_IN_SEC);
    return authenticateSuccess({user: new User(response.email, response.localId, response.idToken, expirationDate), redirect: true}); 
}

const handleError = (errorRes: HttpErrorResponse) => {
    if (!errorRes.error || !errorRes.error.error || !errorRes.error.error.message) {
        return of(authenticateError({authError: {message: 'An unknown error occurred!'}}));
      }
      let message: string;
      switch(errorRes.error.error.message) {
        case 'EMAIL_NOT_FOUND': {message = 'No user found with such email'; break;};
        case 'INVALID_PASSWORD': {message = 'Incorrect credentials'; break;}
        case 'USER_DISABLED': {message = 'Acess to this account is restricted'; break;}
        case 'EMAIL_EXISTS': {message = 'This email is already registered'; break;};
        case 'TOO_MANY_ATTEMPTS_TRY_LATER': {message = 'Too many requests. Try again later'; break;}
        case 'OPERATION_NOT_ALLOWED': {message = 'Password sign-in is disabled'; break;}
        default: {message = 'An unknown error occurred!'; break;}
      }
      return of(authenticateError({authError: {message}}));
}

@Injectable()
export class AuthEffects {
    private static signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp';
    private static logInUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword';
    private static webApiKey = environment.firebaseAPIkey;

    authLogin = createEffect(
        () => this.actions$.pipe(
            ofType(loginRequestStart),
            map(authData => authData.values),
            switchMap(values => {
                return this.http.
                post<AuthResponse>(AuthEffects.logInUrl, 
                    {
                        email: values.email, 
                        password: values.password, 
                        returnSecureToken: true
                    }, {params: new HttpParams().append('key', AuthEffects.webApiKey)}
                )
                .pipe(
                    tap((data) => this.authService.setLogoutTimer(+data.expiresIn * MILISECONDS_IN_SEC)),
                    map(response => handleAuthentication(response)),
                    catchError((errorRes: HttpErrorResponse) => handleError(errorRes))
                );
            })
        )
    );

    authSignUp = createEffect(
        () => this.actions$.pipe(
            ofType(signupRequestStart),
            map(signupData => signupData.values),
            switchMap(data => {
                return this.http.post<AuthResponse>(AuthEffects.signUpUrl, {
                    email: data.email, 
                    password: data.password, 
                    returnSecureToken: true
                }, {params: new HttpParams().append('key', AuthEffects.webApiKey)})
                .pipe(
                    tap((data) => this.authService.setLogoutTimer(+data.expiresIn * MILISECONDS_IN_SEC)),
                    map(response => handleAuthentication(response)),
                    catchError((response: HttpErrorResponse) => handleError(response))
                );
            })
        )
    );

    authSuccess = createEffect(
        () => this.actions$.pipe(
            ofType(authenticateSuccess),
            tap((data) => {
                localStorage.setItem('user', JSON.stringify(data.user));
                if (data.redirect) {
                    this.router.navigate(['/']);
                }
            })
        ),
        {dispatch: false}
    );

    authLogout = createEffect(
        () => this.actions$.pipe(
            ofType(logout),
            tap(() => {
                this.authService.clearLogoutTimer();
                localStorage.removeItem('user');
                this.router.navigate(['/auth']);
            })
        ),
        {dispatch: false}
    );

    autoLogin = createEffect(
        () => this.actions$.pipe(
            ofType(autoLogin),
            map(() => {
                const loadedUser: {
                    email: string,
                    id: string,
                    _token: string,
                    _tokenExpirationDate: string
                  } = JSON.parse(localStorage.getItem('user'));
                  if (!loadedUser) {
                    return logout();
                  }
                  const expirationDate = new Date(loadedUser._tokenExpirationDate);
                  const user = new User(loadedUser.email, loadedUser.id, loadedUser._token, expirationDate);
                  if (user.token) {
                    const expirationInMs = new Date(loadedUser._tokenExpirationDate).getTime() -  new Date().getTime();
                    this.authService.setLogoutTimer(expirationInMs);
                    return authenticateSuccess({user, redirect: false});
                  }
                  return logout();
            })
        )
    );

    constructor(
        private actions$: Actions, 
        private http: HttpClient, 
        private router: Router, 
        private authService: AuthService) {}
}