export interface Booking {
  bookingID: number;
  tourID: number;
  userID: number;
  bookingDate: Date;
  numAdults: number;
  numChildren: number;
  totalPrice: number;
  paymentStatus: string;
  bookingStatus: string;
  specialRequests: string;
}

