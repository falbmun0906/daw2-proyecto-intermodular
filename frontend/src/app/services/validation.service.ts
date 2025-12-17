import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  private usedEmails = ['admin@ejemplo.com', 'user@test.com', 'taken@example.com'];
  private usedUsernames = ['admin', 'root', 'user', 'test'];

  checkEmailAvailable(email: string): Observable<boolean> {
    return of(!this.usedEmails.includes(email.toLowerCase())).pipe(
      switchMap(result => timer(800).pipe(map(() => result)))
    );
  }

  checkUsernameAvailable(username: string): Observable<boolean> {
    return of(!this.usedUsernames.includes(username.toLowerCase())).pipe(
      switchMap(result => timer(600).pipe(map(() => result)))
    );
  }

  emailUniqueValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) return of(null);

      return timer(500).pipe(
        switchMap(() => this.checkEmailAvailable(control.value)),
        map(isAvailable => isAvailable ? null : { emailTaken: true }),
        catchError(() => of(null))
      );
    };
  }

  usernameAvailableValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value || control.value.length < 3) return of(null);

      return timer(300).pipe(
        switchMap(() => this.checkUsernameAvailable(control.value)),
        map(isAvailable => isAvailable ? null : { usernameTaken: true }),
        catchError(() => of(null))
      );
    };
  }
}
