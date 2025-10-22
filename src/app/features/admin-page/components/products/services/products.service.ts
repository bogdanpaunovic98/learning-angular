import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '@src/app/core/model/types.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);

  fetchProducts(page: number): Observable<HttpResponse<Product[]>> {
    return this.http.get<Product[]>('/products', {
      params: { page, size: 20 },
      observe: 'response',
    });
  }
}
