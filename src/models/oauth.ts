export interface GoogleLoginRequest {
  code: string;
}

export interface FbLoginDetails {
  email?: string;
  first_name: string;
}

export interface LoginResponse {
  accessToken: string;
}
