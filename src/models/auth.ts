export interface OAuthUserInfo {
  email: string;
  givenName: string;
}

export interface LoginEmailPasswordDetails {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}
