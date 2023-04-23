import { createQuery } from "@bitmetro/create-query";

import { getBookingById, getBookings, setBookingStatus } from "clients/booking.client";

export const useGetBooking = createQuery(getBookingById);
export const useGetBookings = createQuery(getBookings);
export const useSetBookingStatus = createQuery(setBookingStatus);
