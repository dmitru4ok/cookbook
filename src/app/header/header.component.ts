import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../ngrxStore/app.reducer';
import { AuthServiceService } from '../auth/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy{
  constructor(
    private dataService: DataStorageService, 
    private store: Store<AppState>,
    private authService: AuthServiceService) {}
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
    this.authService.logout();
  }
}
