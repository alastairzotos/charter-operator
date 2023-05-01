import { httpClient } from "clients/http.client";
import { LoginEmailPasswordDetails, type LoginResponse, type OAuthUserInfo } from "models/auth";

export const loginOAuth = async (details: OAuthUserInfo): Promise<string> => {
  const { data } = await httpClient.post<OAuthUserInfo, { data: LoginResponse }>(
    "/users/login-oauth",
    details
  );

  return data.accessToken;
};

export const loginEmailPassword = async (details: LoginEmailPasswordDetails): Promise<string> => {
  const { data } = await httpClient.post<
  LoginEmailPasswordDetails,
  { data: LoginResponse }
  >("/users/login", details);

  return data.accessToken;
}

export const fetchFbUserInfo = async (
  fbAccessToken: string
): Promise<OAuthUserInfo> => {
  const userInfoResponse = await fetch(
    `https://graph.facebook.com/me?access_token=${fbAccessToken}&fields=email,first_name`
  );

  const result = await userInfoResponse.json();

  return {
    email: result.email,
    givenName: result.first_name,
  };
};

export const fetchGoogleUserInfo = async (
  googleAccessToken: string
): Promise<OAuthUserInfo> => {
  const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
    headers: { Authorization: `Bearer ${googleAccessToken}` },
  });

  const result = await response.json();

  return {
    email: result.email,
    givenName: result.given_name,
  };
};
