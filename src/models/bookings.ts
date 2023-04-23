export interface BookingItem {
  _id: string;
  name: string;
  date: string;
  bookingDate: string;
  paymentStatus: string;
  status: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'rejected';

export interface ReadableBooking {
  service: {
    id: string;
    name: string;
  };
  data: Record<string, string>;
  status: BookingStatus;
}
