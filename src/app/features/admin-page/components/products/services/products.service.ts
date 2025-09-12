import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductPagination } from '@src/app/core/model/types.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);

  fetchProducts(pagination: ProductPagination): Observable<Product[]> {
    const params = new HttpParams().set('page', pagination.page).set('size', pagination.size);
    return this.http.get<Product[]>('/products', { params });
  }
}
