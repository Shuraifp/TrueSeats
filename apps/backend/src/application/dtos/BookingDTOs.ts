export interface CreateBookingRequestDTO {
  eventId: number;
  ticketsBooked: number;
}

export interface BookingResponseDTO {
  id: number;
  userId: number;
  eventId: number;
  ticketsBooked: number;
  bookingDate: Date;
  eventName?: string;
  eventDate?: Date;  
}
