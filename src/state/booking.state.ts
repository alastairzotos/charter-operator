import { createQuery } from "@bitmetro/create-query";

import { getBookingById, getBookings, setBookingFulfillment, setBookingStatus } from "clients/booking.client";

export const useGetBooking = createQuery(getBookingById);
export const useGetBookings = createQuery(getBookings);
export const useSetBookingStatus = createQuery(setBookingStatus);
export const useSetBookingFulfillment = createQuery(setBookingFulfillment);
