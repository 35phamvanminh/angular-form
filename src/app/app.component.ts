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
  form!: FormGroup;
  options = [
    { label: '1,234.56', value: '1234.56' },
    { label: '7,890.12', value: '7890.12' },
    { label: '3,456.78', value: '3456.78' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      decimalValue: [''],
    });

    this.form.get('decimalValue')?.valueChanges.subscribe((value) => {
      console.log('Giá trị thay đổi:', value);
    });
  }


  ngDoCheck() {
    console.log(1)
    console.log(2)
  }
}
