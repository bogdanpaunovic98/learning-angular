import { Component, inject, OnInit, signal } from '@angular/core';
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
import { Product, ProductStatus } from '@src/app/core/model/types.model';
import { LoadingService } from '@src/app/shared/services/loading.service';
import { finalize } from 'rxjs';
import { InfiniteScrollDirective } from '@src/app/shared/directives/infinite-scroll.directive';

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
  ],
})
export class Products implements OnInit {
  displayedColumns: string[] = ['name', 'price', 'photo', 'brand', 'status'];

  productStatus: Record<ProductStatus, string> = {
    AVAILABLE: 'Available',
    NOT_AVAILABLE: 'Not Available',
  };

  totalNumberOfPages = signal<number>(0);
  products = signal<Product[]>([]);

  productsService = inject(ProductsService);
  loadingService = inject(LoadingService);

  getProducts(page: number) {
    this.loadingService.show();
    this.productsService
      .fetchProducts(page)
      .pipe(finalize(() => this.loadingService.hide()))
      .subscribe({
        next: (response) => {
          this.totalNumberOfPages.set(Number(response.headers.get('X-Total-Pages')) || 0);
          this.products.update((prev) => prev.concat(response.body || []));
        },
        error: (error) => {
          console.error('Error while fetching products: ', error);
          this.totalNumberOfPages.set(0);
          this.products.set([]);
        },
      });
  }

  ngOnInit() {
    this.getProducts(0);
  }

  getProductStatus(status: ProductStatus) {
    return this.productStatus[status];
  }

  getStatusColor(status: ProductStatus) {
    return status === 'AVAILABLE' ? 'text-green-500' : 'text-red-500';
  }
}
