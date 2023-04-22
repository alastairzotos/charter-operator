export interface GoogleLoginRequest {
  code: string;
}

export interface OAuthUserInfo {
  email: string;
  givenName: string;
}

export interface LoginResponse {
  accessToken: string;
}
