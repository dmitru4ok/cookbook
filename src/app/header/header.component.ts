import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthServiceService } from '../auth/auth-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy{
  constructor(
    private dataService: DataStorageService, 
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
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = Boolean(user);
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
