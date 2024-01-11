import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';

import { AppState } from '../ngrxStore/app.reducer';
import { logout } from '../ngrxStore/auth/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy{
  constructor(
    private dataService: DataStorageService, 
    private store: Store<AppState>) {}
  isAuthenticated = false;
  userSub: Subscription;

  onSaveData() {
    this.dataService.storeRepices();
  }

  onFetchData() {
    this.dataService.fetchRecipes().subscribe();
  }

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
