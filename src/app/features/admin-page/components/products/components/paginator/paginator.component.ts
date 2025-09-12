import { Component, EventEmitter, Output, signal, effect, input } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { ProductPagination } from '@src/app/core/model/types.model';
import { MatSelectModule } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'paginator',
  templateUrl: 'paginator.component.html',
  imports: [MatFormField, MatSelectModule, MatButton, MatIconModule],
})
export class Paginator {
  @Output() paginationUpdated = new EventEmitter<ProductPagination>();
  numberOfProducts = input<number>(0);
  pagination = signal<ProductPagination>({
    page: 0,
    size: 10,
  });
  sizes = [5, 10, 15, 20];

  updatePagination(newValue: number) {
    this.pagination.update((value) => ({
      ...value,
      page: value.page + newValue,
    }));
    this.paginationUpdated.emit(this.pagination());
  }

  constructor() {
    effect(() => {
      this.paginationUpdated.emit(this.pagination());
    });
  }

  get selectedSize(): number {
    return this.pagination().size;
  }

  set selectedSize(value: number) {
    this.pagination.update((current) => ({
      ...current,
      size: value,
      page: 0,
    }));
  }
}
