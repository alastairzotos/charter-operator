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

export interface LoggedInUser {
  _id: string;
  email: string;
  givenName: string;
  role: string;
  instance: string;
}
