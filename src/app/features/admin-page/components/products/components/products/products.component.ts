import { Component, computed, inject, signal } from '@angular/core';
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
import { Product, ProductPagination, ProductStatus } from '@src/app/core/model/types.model';
import { LoadingService } from '@src/app/shared/services/loading.service';
import { finalize } from 'rxjs';
import { Paginator } from '@src/app/features/admin-page/components/products/components/paginator/paginator.component';

@Component({
  selector: 'products',
  templateUrl: 'products.component.html',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    Paginator,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
  ],
})
export class Products {
  displayedColumns: string[] = ['name', 'price', 'photo', 'brand', 'status'];
  productStatus: Record<ProductStatus, string> = {
    AVAILABLE: 'Available',
    NOT_AVAILABLE: 'Not Available',
  };

  products = signal<Product[]>([]);
  productsCount = computed(() => this.products().length);

  productsService = inject(ProductsService);
  loadingService = inject(LoadingService);

  handlePaginationUpdate(updatedPagination: ProductPagination) {
    this.getProducts(updatedPagination);
  }

  getProducts(pagination: ProductPagination) {
    this.loadingService.show();
    this.productsService
      .fetchProducts(pagination)
      .pipe(finalize(() => this.loadingService.hide()))
      .subscribe({
        next: (response) => {
          this.products.set(response);
        },
      });
  }

  ngOnInit() {
    this.getProducts({ page: 0, size: 10 });
  }

  getProductStatus(status: ProductStatus) {
    return this.productStatus[status];
  }

  getStatusColor(status: ProductStatus) {
    return status === 'AVAILABLE' ? 'text-green-500' : 'text-red-500';
  }
}
