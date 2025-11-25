import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from '@src/app/features/admin-page/components/products/services/products.service';
import { LoadingService } from '@src/app/shared/services/loading.service';
import { finalize } from 'rxjs';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditProductFormI, ProductData } from '@src/app/core/model/types.model';
import { MatFormField } from '@angular/material/form-field';
import { MatInput, MatLabel } from '@angular/material/input';
import { editProductFormValidator } from '@src/app/features/admin-page/components/products/validators/edit-product-form.validator';

@Component({
  selector: 'edit-product-form',
  templateUrl: 'edit-product-form.component.html',
  styleUrl: 'edit-product-form.component.scss',
  imports: [
    MatButton,
    MatDialogClose,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
  ],
})
export class EditProductForm implements OnInit {
  productInfo: ProductData | null = null;

  productsService = inject(ProductsService);
  loadingService = inject(LoadingService);
  dialogRef = inject(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);

  editProductForm = new FormGroup<EditProductFormI>({
    name: new FormControl('', { nonNullable: true }),
    price: new FormControl(0, { nonNullable: true }),
    quantity: new FormControl(0, { nonNullable: true }),
  });

  handleSubmit() {
    const payload = {
      ...this.productInfo,
      ...this.editProductForm.value,
    };
    console.log(payload.productSubCategory);
    this.dialogRef.close(payload);
  }

  ngOnInit() {
    this.getProductById(this.data.productId);
  }

  getProductById(productId: number) {
    this.loadingService.show();
    this.productsService
      .fetchProductById(productId)
      .pipe(finalize(() => this.loadingService.hide()))
      .subscribe({
        next: (data) => {
          this.productInfo = data;
          const { name, price, quantity } = data;
          this.editProductForm.setValue({ name, price, quantity });
          this.editProductForm.setValidators(editProductFormValidator(data));
          this.editProductForm.updateValueAndValidity();
        },
        error: (error) => {
          console.error('Error while fetching product by id: ', error);
        },
      });
  }
}
