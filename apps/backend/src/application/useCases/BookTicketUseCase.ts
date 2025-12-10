import { injectable, inject } from 'inversify';
import { IBookingRepository } from '../../domain/repositories/IBookingRepository';
import { IEventRepository } from '../../domain/repositories/IEventRepository';
import { CreateBookingRequestDTO, BookingResponseDTO } from '../dtos/BookingDTOs';
import { TYPES } from '../../inversify.types';
import { ConflictError, NotFoundError, ValidationError } from '../../shared/errors';

@injectable()
export class BookTicketUseCase {
  constructor(
    @inject(TYPES.IBookingRepository) private readonly _bookingRepository: IBookingRepository,
    @inject(TYPES.IEventRepository) private readonly _eventRepository: IEventRepository
  ) {}

  public async execute(userId: number, bookingData: CreateBookingRequestDTO): Promise<BookingResponseDTO> {
    const { eventId, ticketsBooked } = bookingData;

    const event = await this._eventRepository.findById(eventId);
    if (!event) {
      throw new NotFoundError(`Event with ID ${eventId} not found.`);
    }

    if (event.availableSeats < ticketsBooked) {
      throw new ValidationError(`Not enough seats available for event "${event.title}". Available: ${event.availableSeats}, Requested: ${ticketsBooked}.`);
    }

    const existingBooking = await this._bookingRepository.findByUserAndEvent(userId, eventId);
    if (existingBooking) {
      throw new ConflictError(`You have already booked tickets for event "${event.title}".`);
    }

    const newBooking = await this._bookingRepository.create({
      userId,
      eventId,
      ticketsBooked,
      bookingDate: new Date(),
    });

    await this._eventRepository.updateAvailableSeats(eventId, event.availableSeats - ticketsBooked);

    return {
      id: newBooking.id,
      userId: newBooking.userId,
      eventId: newBooking.eventId,
      ticketsBooked: newBooking.ticketsBooked,
      bookingDate: newBooking.bookingDate,
    };
  }
}
