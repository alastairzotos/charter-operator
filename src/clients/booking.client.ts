import { client } from "./http.client";

export const getBookingById = async (id: string) => {
  const { data } = await (await client()).get<Record<string, string>>(`/bookings/readable/${id}`);

  return data;
};
