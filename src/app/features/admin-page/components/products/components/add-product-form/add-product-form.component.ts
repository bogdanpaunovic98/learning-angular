import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductPayload, ProductPayloadFormControlValues } from '@src/app/core/model/types.model';
import { AsyncPipe } from '@angular/common';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatError, MatFormField, MatHint } from '@angular/material/form-field';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatSelect, MatOption } from '@angular/material/select';
import { addProductFormValidator } from '@src/app/features/admin-page/components/products/validators/add-product-form.validator';
import { finalize, forkJoin } from 'rxjs';
import { ProductsService } from '@src/app/features/admin-page/components/products/services/products.service';
import { LoadingService } from '@src/app/shared/services/loading.service';
import { GetAllSubcategoriesPipe } from '@src/app/features/admin-page/components/products/pipes/get-all-subcategories-pipe';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-add-product-form',
  imports: [
    AsyncPipe,
    MatButton,
    MatDialogClose,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    GetAllSubcategoriesPipe,
    MatIcon,
    MatMiniFabButton,
    MatError,
    MatHint,
  ],
  templateUrl: './add-product-form.component.html',
  styleUrl: './add-product-form.component.scss',
})
export class AddProductForm implements OnInit {
  loadingService = inject(LoadingService);
  productsService = inject(ProductsService);
  dialogRef = inject(MatDialogRef);

  brandsAndCategories$ = forkJoin({
    brands: this.productsService.fetchBrands(),
    categories: this.productsService.fetchCategories(),
  }).pipe(finalize(() => this.loadingService.hide()));

  newProducts = new FormArray<FormGroup<ProductPayloadFormControlValues>>([
    new FormGroup<ProductPayloadFormControlValues>(
      {
        name: new FormControl('', { nonNullable: true }),
        price: new FormControl(null, { nonNullable: true }),
        quantity: new FormControl(0, { nonNullable: true }),
        brand: new FormControl(null),
        productSubCategory: new FormControl(null),
      },
      {
        validators: addProductFormValidator(),
      },
    ),
  ]);

  addProduct() {
    this.newProducts.push(
      new FormGroup<ProductPayloadFormControlValues>(
        {
          name: new FormControl('', { nonNullable: true }),
          price: new FormControl(null, { nonNullable: true }),
          quantity: new FormControl(0, { nonNullable: true }),
          brand: new FormControl(null),
          productSubCategory: new FormControl(null),
        },
        {
          validators: addProductFormValidator(),
        },
      ),
    );
  }

  asd() {
    this.newProducts.markAllAsTouched();
    const allValid = this.newProducts.controls.every((control) => control.valid);
    const isSingleProduct = this.newProducts.length === 1;
    this.loadingService.show();
    if (isSingleProduct) {
      this.productsService
        .addNewProduct(this.newProducts.controls[0].value as ProductPayload)
        .pipe(finalize(() => this.loadingService.hide()))
        .subscribe({
          next: () => {
            this.dialogRef.close();
          },
          error: (error) => {
            console.error('Failed to add new product: ', error);
          },
        });
    } else {
      const payload = this.newProducts.controls.map((control) => control.value as ProductPayload);
      this.productsService
        .addMultipleNewProducts(payload)
        .pipe(finalize(() => this.loadingService.hide()))
        .subscribe({
          next: () => {
            this.dialogRef.close();
          },
          error: (error) => {
            console.error('Failed to add multiple new products: ', error);
          },
        });
    }
  }

  ngOnInit() {}
}
