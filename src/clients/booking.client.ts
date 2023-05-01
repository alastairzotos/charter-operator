import { httpClient } from "clients/http.client";
import { BookingStatus, ReadableBooking, type BookingItem } from "models/bookings";

export const getBookingById = async (id: string): Promise<ReadableBooking> => {
  const { data } = await httpClient.get<ReadableBooking>(`/bookings/readable/${id}`);

  return data;
};

export const getBookings = async () => {
  const { data } = await httpClient.get<BookingItem[]>(`/bookings/for-user`);

  return data.sort(
    (a, b) =>
      new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime()
  );
};

export const setBookingStatus = async (id: string, status: BookingStatus) => {
  await httpClient.patch<unknown, { id: string; status: BookingStatus }>(
    "/bookings",
    { id, status }
  );
};

export const setBookingFulfillment = async (id: string, fulfilled: boolean ) => {
  await httpClient.post<unknown, { id: string; fulfilled: boolean }>(
    "/bookings/fulfillment",
    { id, fulfilled }
  );
};
