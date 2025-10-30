import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function filterFormValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const filterFormValue = control.value;
    const allEmpty = Object.values(filterFormValue).every((value) => !value);
    return allEmpty ? { allEmpty: true } : null;
  };
}
