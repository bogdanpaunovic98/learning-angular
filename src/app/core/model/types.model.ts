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

export interface ProductPagination {
  page: number;
  size: number;
}
