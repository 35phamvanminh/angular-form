import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';

const exceptNumberValidator = (number: Number): ValidatorFn | null => {
  return (control: AbstractControl): ValidationErrors | null => {
    return Number(control.value) === number ? { exist: true } : null;
  };
};


const exceptNumberValidatorAsync = (api: ApiService): ValidatorFn | null => {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return api.validateNumber(Number(control.value)).pipe(
      map((isValid: boolean) => {
        return isValid ? null : { existAsync: true };
      })
    );
  };
};



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  signInForm!: FormGroup;

  get username(): FormControl {
    return this.signInForm.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.signInForm.get('password') as FormControl;
  }

  get rememberMe(): FormControl {
    return this.signInForm.get('rememberMe') as FormControl;
  }

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.signInForm = this.fb.group({
      username: ['', exceptNumberValidator(1), exceptNumberValidatorAsync(this.api)],
      password: ['', Validators.required],
      rememberMe: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log(this.signInForm.value);
  }
}
