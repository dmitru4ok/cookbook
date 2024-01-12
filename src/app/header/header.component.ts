import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../ngrxStore/app.reducer';
import { logout } from '../ngrxStore/auth/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy{
  constructor(private store: Store<AppState>) {}
  isAuthenticated = false;
  userSub: Subscription;

  ngOnInit(): void {
    this.userSub = this.store.select('auth').subscribe(user => {
      this.isAuthenticated = Boolean(user.user);
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.store.dispatch(logout());
  }
}
