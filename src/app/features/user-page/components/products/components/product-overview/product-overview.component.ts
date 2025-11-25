import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@src/app/features/user-page/components/products/services/products.service';
import { LoadingService } from '@src/app/shared/services/loading.service';
import { finalize } from 'rxjs';
import { ProductOverview, productStatus, ProductStatus } from '@src/app/core/model/types.model';
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
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-overview',
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
    MatIconButton,
    MatIcon,
  ],
  templateUrl: './product-overview.component.html',
  styleUrl: './product-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductOverviewComponent implements OnInit {
  id: string | null = null;

  DISPLAYED_COLUMNS: string[] = [
    'name',
    'price',
    'photo',
    'brand',
    'category',
    'subcategory',
    'status',
  ];

  route = inject(ActivatedRoute);
  productsService = inject(ProductsService);
  loadingService = inject(LoadingService);
  location = inject(Location);
  product = signal<ProductOverview | null>(null);

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.getProductOverview(this.id);
  }

  getProductOverview(id: string) {
    this.loadingService.show();
    this.productsService
      .fetchProductOverview(id)
      .pipe(finalize(() => this.loadingService.hide()))
      .subscribe({
        next: (data) => {
          this.product.set(data);
        },
        error: (error) => {
          console.error('Error while fetching product overview data', error);
        },
      });
  }

  getProductStatus(status: ProductStatus) {
    return productStatus[status];
  }

  getStatusColor(status: ProductStatus) {
    return status === 'AVAILABLE' ? 'text-green-500' : 'text-red-500';
  }

  goBack() {
    this.location.back();
  }
}
