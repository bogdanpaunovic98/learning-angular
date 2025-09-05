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
