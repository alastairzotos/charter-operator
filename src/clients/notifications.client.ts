import { httpClient } from "clients/http.client";

export const attachPushTokenToOperator = async (token: string) => {
  try {
    await httpClient.post<{ token: string }>("/operators/notification-token", {
      token,
    });
  } catch (e) {
    console.log(e);
  }
};
