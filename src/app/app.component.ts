import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from './ngrxStore/auth/auth.reducer';
import { autoLogin } from './ngrxStore/auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit{
  constructor(private store: Store<AuthState>) {}
  ngOnInit(): void {
    this.store.dispatch(autoLogin());
  }
}
