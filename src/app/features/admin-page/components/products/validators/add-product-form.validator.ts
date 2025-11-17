import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ProductPayload } from '@src/app/core/model/types.model';

type ErrorName = keyof Omit<ProductPayload, 'quantity'>;

const errorRecord: Record<ErrorName, string> = {
  name: "Product's name cannot be empty.",
  price: 'Product price cannot be 0.',
  brand: 'Product must have a brand selected.',
  productSubCategory: 'Product must have a subcategory selected.',
};

export function addProductFormValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const errors: ValidationErrors = {};
    const { quantity, ...rest } = control.value as ProductPayload;
    Object.keys(rest).forEach((key) => {
      const typedKey = key as ErrorName;

      if (!rest[typedKey]) errors[typedKey] = errorRecord[typedKey];
    });
    return Object.keys(errors).length > 0 ? errors : null;
  };
}
