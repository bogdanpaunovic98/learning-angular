import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '@src/app/core/model/types.model';

@Pipe({
  name: 'filterByCategory',
})
export class FilterByCategoryPipe implements PipeTransform {
  transform(categories: Category[], name: string | null) {
    return name ? categories.find((item: any) => item.categoryName === name)?.subCategories : [];
  }
}
