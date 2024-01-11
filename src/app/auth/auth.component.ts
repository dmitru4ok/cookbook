import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { PlaceholderDirective } from '../shared/placeholder.directive';
import { AlertComponent } from '../alert/alert.component';
import { Subscription } from 'rxjs';
import { AppState } from '../ngrxStore/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from '../ngrxStore/auth/auth.actions';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy{
  isLoginMode: boolean = true;
  form: FormGroup;
  static readonly passLength = 6;
  passwordsNotEqual = false;
  @ViewChild(PlaceholderDirective) alertPlace: PlaceholderDirective;
  closeSubs: Subscription;
  storeSub: Subscription;
  isLoading = false;
  error: string;

  constructor(
    private store: Store<AppState>) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.form.patchValue({'passwords': {'repeatpass': ''}});
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'passwords': new FormGroup({
        'password': new FormControl(null, [Validators.required, Validators.minLength(AuthComponent.passLength)]),
        'repeatpass': new FormControl(null, [this.customValidatorLength.bind(this), this.customValidatorRequired.bind(this)])
      }, this.customValidatorEquality.bind(this)),
    });

    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.error;
      if (this.error) {
        this.showErrorAlert();
      }
    });
  }

  customValidatorRequired(control: AbstractControl<any>): ValidationErrors | null {
    if (!this.isLoginMode) {
      return Validators.required(control);
    }
    return null;
  }
  customValidatorLength(control: AbstractControl<any>): ValidationErrors| null {
    if (!this.isLoginMode) {
      return Validators.minLength(AuthComponent.passLength)(control);
    }
    return null;
  }

  customValidatorEquality(group: AbstractControl<any>): ValidationErrors | null {
    if (!this.isLoginMode) {
      const passValue = group.get('password').value;
      const repeatPassValue = group.get('repeatpass').value;
      if (passValue !== repeatPassValue) {
        this.passwordsNotEqual = true;
        return {'passwordsNotEqual': true};
      } else {
        this.passwordsNotEqual = false;
      }
    }
    return null;
  }

  onSubmit() {
    this.error = null;
    if (this.form.invalid) {
      return;
    }
    const email = this.form.value['email'];
    const password = this.form.value['passwords']['password'];
    
    if (this.isLoginMode) {
      this.store.dispatch(AuthActions.loginRequestStart({values: {email, password}}));
    } else {
      this.store.dispatch(AuthActions.signupRequestStart({values: {email, password}}));
    }
    this.form.reset();
  }

  private showErrorAlert() {
    this.alertPlace.VCR.clear();
    const component = this.alertPlace.VCR.createComponent(AlertComponent);
    component.instance.message = this.error;
    this.closeSubs = component.instance.closeEvent.subscribe(() => {
      this.closeSubs.unsubscribe();
      this.alertPlace.VCR.clear();
      this.store.dispatch(AuthActions.clearError());
    });
  }

  ngOnDestroy(): void {
    if (this.closeSubs) {
      this.closeSubs.unsubscribe();
    }
    this.storeSub.unsubscribe();
  }
}
