import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { ProductsService } from '@src/app/features/admin-page/components/products/services/products.service';
import {
  Product,
  ProductFilterForm,
  ProductFilterFormValueType,
  ProductStatus,
} from '@src/app/core/model/types.model';
import { LoadingService } from '@src/app/shared/services/loading.service';
import { finalize } from 'rxjs';
import { InfiniteScrollDirective } from '@src/app/shared/directives/infinite-scroll.directive';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductsFilterForm } from '@src/app/features/admin-page/components/products/components/products-filter-form/products-filter-form.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { filterFormValidator } from '@src/app/features/admin-page/components/products/validators/filter-form.validator';
import { filterCfg } from '@src/app/features/admin-page/components/products/utils/query-config-record';
import { CriteriaBuilder } from '@src/app/features/admin-page/components/products/utils/query-builder/models/CriteriaBuilder';

@Component({
  selector: 'products',
  templateUrl: 'products.component.html',
  styleUrl: 'products.component.scss',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    InfiniteScrollDirective,
    MatButton,
  ],
})
export class Products implements OnInit {
  DISPLAYED_COLUMNS: string[] = ['name', 'price', 'photo', 'brand', 'status'];

  productStatus: Record<ProductStatus, string> = {
    AVAILABLE: 'Available',
    NOT_AVAILABLE: 'Not Available',
  };

  filterForm = new FormGroup<ProductFilterForm>(
    {
      search: new FormControl(null),
      category: new FormControl(null),
      subcategory: new FormControl({ value: null, disabled: true }),
      brand: new FormControl(null),
    },
    {
      validators: filterFormValidator(),
    },
  );

  products = signal<Product[]>([]);
  totalNumberOfPages = 0;
  currentPage = 0;
  productsService = inject(ProductsService);
  loadingService = inject(LoadingService);
  dialog = inject(MatDialog);
  destroyRef = inject(DestroyRef);
  filtersApplied = false;
  query = '';
  savedValues = {} as ProductFilterFormValueType;

  getProducts(isReset: boolean = false) {
    this.loadingService.show();
    if (this.query) {
      this.filtersApplied = true;
    }
    this.productsService
      .fetchProducts(this.currentPage, this.query)
      .pipe(finalize(() => this.loadingService.hide()))
      .subscribe({
        next: (response) => {
          this.totalNumberOfPages = Number(response.headers.get('X-Total-Pages')) || 0;
          if (isReset) {
            this.products.set(response.body || []);
          } else {
            this.products.update((prev) => prev.concat(response.body || []));
          }
        },
        error: (error) => {
          console.error('Error while fetching products: ', error);
          this.totalNumberOfPages = 0;
          this.currentPage = 0;
          this.products.set([]);
        },
      });
  }

  ngOnInit() {
    this.getProducts();

    this.filterForm.controls.category.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (!result) {
          this.filterForm.controls.subcategory.disable();
        } else {
          this.filterForm.controls.subcategory.enable();
        }
      });
  }

  getProductStatus(status: ProductStatus) {
    return this.productStatus[status];
  }

  getStatusColor(status: ProductStatus) {
    return status === 'AVAILABLE' ? 'text-green-500' : 'text-red-500';
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      filterForm: this.filterForm,
    };

    this.savedValues = this.filterForm.getRawValue();

    const dialogRef = this.dialog.open(ProductsFilterForm, dialogConfig);

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: string) => {
        if (data === 'Apply') {
          this.buildQuery();
          this.products.set([]);
          this.currentPage = 0;
          this.getProducts();
        } else {
          this.filterForm.setValue(this.savedValues);
        }
      });
  }

  buildQuery() {
    const formValue = this.filterForm.value;
    const builder = Object.entries(formValue).reduce((cb, [key, v]) => {
      const filterKey = key as keyof ProductFilterForm;
      return filterCfg[filterKey](cb, v);
    }, new CriteriaBuilder());
    this.query = builder.build();
  }

  resetFilters() {
    this.filtersApplied = false;
    this.query = '';
    this.currentPage = 0;
    this.filterForm.reset();
    this.getProducts(true);
  }

  getNextPage() {
    if (this.currentPage < this.totalNumberOfPages - 1) {
      this.currentPage += 1;
      this.getProducts();
    }
  }
}
