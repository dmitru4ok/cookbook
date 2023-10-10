import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthServiceService } from './auth-service.service';
import { Router } from '@angular/router';
import { PlaceholderDirective } from '../shared/placeholder.directive';
import { AlertComponent } from '../alert/alert.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy{
  isLoginMode: boolean = true;
  form: FormGroup;
  static passLength = 6;
  passwordsNotEqual = false;
  loading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective) alertPlace: PlaceholderDirective;
  closeSubs: Subscription;

  constructor(
    private authService: AuthServiceService, 
    private router: Router) {}

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
    this.loading = true;
    
    if (this.isLoginMode) {
      this.authService.logIn(email, password).subscribe({
        next: () =>  {
          this.loading = false;
          this.router.navigate(['/recipes']);
        },
        error: (error: Error) => {
          console.log(error);
          // this.error = error.message;
          this.showErrorAlert(error.message)
          this.loading = false;
        }
      });
    } else {
      this.authService.signUp(email, password).subscribe({
        next: () =>  {
          this.loading = false;
          this.router.navigate(['/recipes']);
        },
        error: (error: Error) => {
          console.log(error);
          // this.error = error.message;
          this.showErrorAlert(error.message);
          this.loading = false;
        }
      });
    }
    this.form.reset();
  }

  onCloseAlert() {
    this.error = null;
  }

  private showErrorAlert(errorMsg: string) {
    this.error = errorMsg;
    this.alertPlace.VCR.clear();
    const component = this.alertPlace.VCR.createComponent(AlertComponent);
    component.instance.message = this.error;
    this.closeSubs = component.instance.closeEvent.subscribe(() => {
      this.closeSubs.unsubscribe();
      this.alertPlace.VCR.clear();
    });
  }

  ngOnDestroy(): void {
    if (this.closeSubs) {
      this.closeSubs.unsubscribe();
    }
  }
}
