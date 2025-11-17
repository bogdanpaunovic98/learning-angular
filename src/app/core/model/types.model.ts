import { FormControl } from '@angular/forms';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  username: string;
  firstname: string;
  lastname: string;
  activated: boolean;
  role: string;
}

interface RegistrationPassword {
  newPassword: string;
  newPasswordConfirm: string;
}

interface UserContactInfo {
  email: string;
  contactPhone: string;
}

export interface RegisterRequest {
  username: string;
  password: RegistrationPassword;
  firstName: string;
  lastName: string;
  userContactInfo: UserContactInfo;
}

export interface LoggedInUserInfo {
  username: string;
  firstName: string;
  lastName: string;
  activated: boolean;
  role: string;
}

export type ProductStatus = 'AVAILABLE' | 'NOT_AVAILABLE';

export interface Product {
  id: number;
  name: string;
  price: number;
  coverPhotoUrl: string;
  brandName: string;
  status: ProductStatus;
}

export interface Option {
  value: string;
  label: string;
}

export interface ProductFilterForm {
  search: FormControl<string | null>;
  category: FormControl<string | null>;
  subcategory: FormControl<string | null>;
  brand: FormControl<string | null>;
}

export interface ProductFilterFormValueType {
  search: string | null;
  category: string | null;
  subcategory: string | null;
  brand: string | null;
}

export interface Brand {
  id: number;
  brandName: string;
}

export interface Subcategory {
  id: number;
  subCategoryName: string;
}

export interface Category {
  id: number;
  categoryName: string;
  subCategories: Subcategory[];
}

export interface EditProductFormI {
  name: FormControl<string>;
  price: FormControl<number>;
  quantity: FormControl<number>;
}

export interface ProductSubCategory {
  id: number;
  subCategoryName: string;
  category: Partial<Category>;
}

export interface ProductData {
  id: number;
  name: string;
  price: number;
  quantity: number;
  images: string[];
  brand: Brand;
  productSubCategory: ProductSubCategory;
}

export interface ProductPayload {
  name: string;
  price: number;
  quantity: number;
  brand: {
    id: number;
  };
  productSubCategory: {
    id: number;
  };
}

export interface ProductPayloadFormControlValues {
  name: FormControl<string>;
  price: FormControl<number | null>;
  quantity: FormControl<number>;
  brand: FormControl<{ id: number } | null>;
  productSubCategory: FormControl<{ id: number } | null>;
}

export interface UpdateProductPayload extends ProductPayload {
  id: string;
}
