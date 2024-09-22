import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  validateNumber(number: Number): Observable<boolean> {
    const existedUsers = [1,2,3];
    const isValid = existedUsers.every(value => value !== number);
    return of(isValid).pipe(delay(1000));
  }
}
