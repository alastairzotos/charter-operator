import { httpClient } from "clients/http.client";
import { type BookingItem } from "models/bookings";

export const getBookingById = async (id: string) => {
  const { data } = await (
    await httpClient()
  ).get<Record<string, string>>(`/bookings/readable/${id}`);

  return data;
};

export const getBookings = async (operatorId: string) => {
  const { data } = await (
    await httpClient()
  ).get<BookingItem[]>(`/bookings/by-operator-id/${operatorId}`);

  return data.sort(
    (a, b) =>
      new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime()
  );
};
