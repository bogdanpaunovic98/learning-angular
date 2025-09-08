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
