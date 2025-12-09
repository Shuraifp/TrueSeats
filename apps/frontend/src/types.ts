export type UserRole = "user" | "admin";

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  availableSeats: number;
}

export interface Booking {
  id: number;
  eventName: string;
  eventDate: string;
  ticketsBooked: number;
  bookingDate: string;
}