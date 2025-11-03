import { OnInit, Component, inject, signal } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect, MatOption } from '@angular/material/select';
import { Category } from '@src/app/core/model/types.model';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { forkJoin, finalize } from 'rxjs';
import { ProductsService } from '@src/app/features/admin-page/components/products/services/products.service';
import { LoadingService } from '@src/app/shared/services/loading.service';
import { Brand } from '@src/app/core/model/types.model';
import { FilterByCategoryPipe } from '@src/app/features/admin-page/components/products/pipes/filter-by-category-pipe';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'products-filter-form',
  templateUrl: 'products-filter-form.component.html',
  styleUrl: 'products-filter-form.component.scss',
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatButton,
    ReactiveFormsModule,
    MatDialogClose,
    FilterByCategoryPipe,
    AsyncPipe,
  ],
})
export class ProductsFilterForm {
  productsService = inject(ProductsService);
  loadingService = inject(LoadingService);
  dialogRef = inject(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);

  brandsAndCategories$ = forkJoin({
    brands: this.productsService.fetchBrands(),
    categories: this.productsService.fetchCategories(),
  }).pipe(finalize(() => this.loadingService.hide()));

  handleSubmit() {
    if (this.data.filterForm.valid) this.dialogRef.close('Apply');
  }
}
