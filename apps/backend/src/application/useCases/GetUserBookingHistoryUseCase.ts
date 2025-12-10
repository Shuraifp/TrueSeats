import { injectable, inject } from 'inversify';
import { IBookingRepository } from '../../domain/repositories/IBookingRepository';
import { IEventRepository } from '../../domain/repositories/IEventRepository';
import { BookingResponseDTO } from '../dtos/BookingDTOs';
import { TYPES } from '../../inversify.types';

@injectable()
export class GetUserBookingHistoryUseCase {
  constructor(
    @inject(TYPES.IBookingRepository) private readonly _bookingRepository: IBookingRepository,
    @inject(TYPES.IEventRepository) private readonly _eventRepository: IEventRepository
  ) {}

  public async execute(userId: number): Promise<BookingResponseDTO[]> {
    const bookings = await this._bookingRepository.findByUserId(userId);

    const bookingHistory: BookingResponseDTO[] = [];
    for (const booking of bookings) {
      const event = await this._eventRepository.findById(booking.eventId);
      if (event) {
        bookingHistory.push({
          id: booking.id,
          userId: booking.userId,
          eventId: booking.eventId,
          ticketsBooked: booking.ticketsBooked,
          bookingDate: booking.bookingDate,
          eventName: event.title,
          eventDate: event.date,
        });
      }
    }

    return bookingHistory;
  }
}
