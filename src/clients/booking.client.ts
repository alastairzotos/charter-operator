import { httpClient } from "./http.client";

export const getBookingById = async (id: string) => {
  const { data } = await httpClient.get<Record<string, string>>(`/bookings/readable/${id}`);


  return data;
};
