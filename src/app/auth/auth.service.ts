import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../ngrxStore/app.reducer';
import { logout } from '../ngrxStore/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenExpTimer: NodeJS.Timeout;
  constructor(private store: Store<AppState>){}


  setLogoutTimer(expirationInMiliseconds: number) {
    this.tokenExpTimer = setTimeout(() => {
      this.store.dispatch(logout());
    }, expirationInMiliseconds);
  }

  clearLogoutTimer() {
    if (this.tokenExpTimer) {
      clearTimeout(this.tokenExpTimer);
      this.tokenExpTimer = null;
    }
  }
}
