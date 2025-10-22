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
import { BehaviorSubject, catchError, finalize, map, Observable, of, scan, switchMap } from 'rxjs';
import { InfiniteScrollDirective } from '@src/app/shared/directives/infinite-scroll.directive';
import { AsyncPipe } from '@angular/common';

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
    AsyncPipe,
  ],
})
export class Products implements OnInit {
  displayedColumns: string[] = ['name', 'price', 'photo', 'brand', 'status'];

  productStatus: Record<ProductStatus, string> = {
    AVAILABLE: 'Available',
    NOT_AVAILABLE: 'Not Available',
  };

  page$ = new BehaviorSubject(0);
  totalNumberOfPages = signal<number>(0);

  productsService = inject(ProductsService);
  loadingService = inject(LoadingService);

  products$: Observable<Product[]> = this.page$.pipe(
    switchMap((newValue) => this.getProducts(newValue)),
    scan((acc, curr) => acc.concat(curr), [] as Product[]),
  );

  getProducts(page: number = 0): Observable<Product[]> {
    this.loadingService.show();
    return this.productsService.fetchProducts(page).pipe(
      map((response) => {
        this.totalNumberOfPages.set(Number(response.headers.get('X-Total-Pages')) || 0);
        return response.body || ([] as Product[]);
      }),
      catchError((error) => {
        console.error('Error while fetching products: ', error);
        this.totalNumberOfPages.set(0);
        return of([] as Product[]);
      }),
      finalize(() => this.loadingService.hide()),
    );
  }

  ngOnInit() {
    this.page$.next(0);
  }

  getProductStatus(status: ProductStatus) {
    return this.productStatus[status];
  }

  getStatusColor(status: ProductStatus) {
    return status === 'AVAILABLE' ? 'text-green-500' : 'text-red-500';
  }
}
