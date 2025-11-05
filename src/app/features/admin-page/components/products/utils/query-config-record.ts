import { ProductFilterForm } from '@src/app/core/model/types.model';
import { CriteriaBuilder } from '@src/app/features/admin-page/components/products/utils/query-builder/models/CriteriaBuilder';

export const filterCfg: Record<
  keyof ProductFilterForm,
  (cb: CriteriaBuilder, value: string | null) => CriteriaBuilder
> = {
  search: (cb, value) => {
    if (value && value.trim()) return cb.like('name', value.trim());
    return cb;
  },
  category: (cb, value) => {
    if (value) return cb.eq('productCategory.categoryName', value);
    return cb;
  },
  subcategory: (cb, value) => {
    if (value) return cb.eq('productCategory.productSubCategory.subCategoryName', value);
    return cb;
  },
  brand: (cb, value) => {
    if (value) return cb.eq('brand.brandName', value);
    return cb;
  },
};
