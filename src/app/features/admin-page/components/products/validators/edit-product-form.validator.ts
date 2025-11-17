import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ProductData } from '@src/app/core/model/types.model';

export function editProductFormValidator(productData: ProductData | null): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const { name, price, quantity } = control.value;
    if (
      !name ||
      (name === productData?.name &&
        price === productData?.price &&
        quantity === productData?.quantity)
    )
      return { error: true };
    return null;
  };
}
