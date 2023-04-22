import { FbLoginDetails, LoginResponse } from "../models/oauth";
import { httpClient } from "./http.client";

// export const loginWithGoogle = async (code: string): Promise<string> => {
//   const { data } = await httpClient.post<
//     GoogleLoginRequest,
//     { data: LoginResponse }
//   >(`/oauth2/google`, { code });
//   return data.accessToken;
// };

export const loginWithFacebook = async (
  details: FbLoginDetails
): Promise<string> => {
  const client = await httpClient();
  const { data } = await client.post<
    FbLoginDetails,
    { data: LoginResponse }
  >("/oauth2/facebook", details);
  return data.accessToken;
};

export const fetchFbUserInfo = async (fbAccessToken: string): Promise<FbLoginDetails> => {
  const userInfoResponse = await fetch(
    `https://graph.facebook.com/me?access_token=${fbAccessToken}&fields=email,first_name`
  )

  return await userInfoResponse.json();
}
