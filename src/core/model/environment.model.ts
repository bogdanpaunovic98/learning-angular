export interface EnvironmentModel {
  apiUrl: string;
}

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

export interface RegisterRequest {
  username: string;
  password: {
    newPassword: string;
    newPasswordConfirm: string;
  };
  firstName: string;
  lastName: string;
  userContactInfo: {
    email: string;
    contactPhone: string;
  };
}
