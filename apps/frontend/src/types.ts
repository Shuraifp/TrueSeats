export type UserRole = "user" | "admin";

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string; // Keep as string for now for input fields, will convert to Date for API calls
  availableSeats: number;
  creatorId: number;
}

export interface Booking {
  id: number;
  userId: number;
  eventId: number;
  ticketsBooked: number;
  bookingDate: string; // Keep as string for display, will be Date from backend
  eventName?: string; // Optional: for user's booking history view
  eventDate?: string; // Optional: for user's booking history view (keep as string for display)
}

export interface RegisterRequestDTO {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface LoginRequestDTO {
  email: string;
  password: string;
}