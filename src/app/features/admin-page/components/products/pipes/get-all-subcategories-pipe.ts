import { Pipe, PipeTransform } from '@angular/core';
import { Category, Subcategory } from '@src/app/core/model/types.model';

@Pipe({
  name: 'getAllSubcategoriesPipe',
})
export class GetAllSubcategoriesPipe implements PipeTransform {
  transform(allCategories: Category[]): Subcategory[] {
    let allSubCategories: Subcategory[] = [];
    allCategories.forEach((category) => {
      allSubCategories = allSubCategories.concat(category.subCategories);
    });
    return allSubCategories;
  }
}
