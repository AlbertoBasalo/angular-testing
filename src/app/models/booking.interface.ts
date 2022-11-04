export interface Booking {
  id: string;
  tripId: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    gender: string;
  };
  seats: number;
  premiumFood: boolean;
  paymentMethod: string;
  date: string;
  status: string;
}
