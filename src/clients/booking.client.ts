import { httpClient } from "clients/http.client";
import { BookingStatus, ReadableBooking, type BookingItem } from "models/bookings";

export const getBookingById = async (id: string): Promise<ReadableBooking> => {
  const { data } = await (
    await httpClient()
  ).get<ReadableBooking>(`/bookings/readable/${id}`);

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

export const setBookingStatus = async (id: string, status: BookingStatus) => {
  const client = await httpClient()
  await client.patch<any, unknown, { id: string; status: BookingStatus }>(
    "/bookings",
    { id, status }
  );
};

export const setBookingFulfillment = async (id: string, fulfilled: boolean ) => {
  const client = await httpClient()
  await client.post<any, unknown, { id: string; fulfilled: boolean }>(
    "/bookings/fulfillment",
    { id, fulfilled }
  );
};
