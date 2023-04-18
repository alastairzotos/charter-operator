import { createQuery } from '@bitmetro/create-query';
import { getBookingById } from '../clients/booking.client';

export const useGetBooking = createQuery(getBookingById);
