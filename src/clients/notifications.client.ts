import { httpClient } from "./http.client";

export const attachPushTokenToOperator = async (server: string, operatorId: string, token: string) => {
  try {
    const client = await httpClient(server);
    await client.post<{}, {}, { id: string, token: string }>('/operators/notification-token', { id: operatorId, token })
  } catch { }
}
