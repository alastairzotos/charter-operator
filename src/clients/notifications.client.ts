import { httpClient } from "clients/http.client";

export const attachPushTokenToOperator = async (
  operatorId: string,
  token: string
) => {
  try {
    await httpClient.post<any, { id: string; token: string }>(
      "/operators/notification-token",
      { id: operatorId, token }
    );
  } catch (e) {
    console.log(e);
  }
};
