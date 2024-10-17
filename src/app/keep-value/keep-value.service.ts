import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeepValueService {
  private formGroupSubject = new BehaviorSubject<FormGroup | null>(null);

  constructor() {}

  setFormGroup(formGroup: FormGroup) {
    this.formGroupSubject.next(formGroup);
  }

  getFormGroup() {
    return this.formGroupSubject.asObservable();
  }
}
