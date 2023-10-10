import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './auth/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit{
  constructor(private authService: AuthServiceService) {}
  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
