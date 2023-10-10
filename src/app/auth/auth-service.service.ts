import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, BehaviorSubject, tap } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  kind: string;
  registered?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private static signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp';
  private static logInUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword';
  private static webApiKey = environment.firebaseAPIkey;
  user = new BehaviorSubject<User>(null);
  tokenExpTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    return this.http.post<AuthResponse>(AuthServiceService.signUpUrl, 
      {email, password, returnSecureToken: true},  //body
      {params: new HttpParams().append('key', AuthServiceService.webApiKey)}) //params
      .pipe(
        catchError(this.handleError),  
        tap(data => this.handleAuth(data.email, data.localId, data.idToken, data.expiresIn)
      ));
  }


  logIn(email: string, password: string) {
    return this.http.post<AuthResponse>(AuthServiceService.logInUrl, 
    {
      email, password, returnSecureToken: true
    }, 
    {
      params: new HttpParams().append('key', AuthServiceService.webApiKey)
    })
    .pipe(
      catchError(this.handleError),  
      tap(data => this.handleAuth(data.email, data.localId, data.idToken, data.expiresIn)
      ));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let message: string;
      if (!errorRes.error || !errorRes.error.error || !errorRes.error.error.message) {
        message = 'An unknown error occurred!';
        return throwError(() => {
          new Error(message);
        });
      }
      switch(errorRes.error.error.message) {
        case 'EMAIL_NOT_FOUND': {message = 'No user found with such email'; break;};
        case 'INVALID_PASSWORD': {message = 'Incorrect credentials'; break;}
        case 'USER_DISABLED': {message = 'Acess to this account is restricted'; break;}
        case 'EMAIL_EXISTS': {message = 'This email is already registered'; break;};
        case 'TOO_MANY_ATTEMPTS_TRY_LATER': {message = 'Too many requests. Try again later'; break;}
        case 'OPERATION_NOT_ALLOWED': {message = 'Password sign-in is disabled'; break;}
        default: {message = 'An unknown error occurred!'; break;}
      }
      return throwError(() => {
        return new Error(message);
      })
  }
  
  private handleAuth(email: string, userId: string, token: string, expiresIn: string) {
    const date = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, userId, token, date);
    this.user.next(user);
    this.autoLogout((+expiresIn) * 1000);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem('user');
    this.user.next(null);
    this.router.navigate(['/auth']);
    if (this.tokenExpTimer) {
      clearTimeout(this.tokenExpTimer);
    }
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      return;
    }
    const newUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if (newUser.token) {
      this.user.next(newUser);
      const expirationInMiliseconds = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationInMiliseconds);
    }
  }

  autoLogout(expirationInMiliseconds: number) {
    this.tokenExpTimer = setTimeout(() => {
      this.logout();
    }, expirationInMiliseconds);
  }


}
