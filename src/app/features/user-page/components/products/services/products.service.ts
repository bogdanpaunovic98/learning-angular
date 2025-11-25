import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductOverview } from '@src/app/core/model/types.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);

  fetchProductOverview(id: string) {
    return this.http.get<ProductOverview>(`/products/overview/${id}`);
  }
}
