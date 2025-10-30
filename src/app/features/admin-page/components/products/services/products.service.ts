import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand, Category, Product, Subcategory } from '@src/app/core/model/types.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);

  fetchProducts(page: number, query: string): Observable<HttpResponse<Product[]>> {
    let params = new HttpParams().set('page', page).set('size', 18);
    if (query) params = params.set('query', query);
    return this.http.get<Product[]>('/products', {
      params,
      observe: 'response',
    });
  }

  fetchBrands() {
    return this.http.get<Brand[]>('/brand');
  }

  fetchCategories() {
    return this.http.get<Category[]>('/product-categories');
  }
}
