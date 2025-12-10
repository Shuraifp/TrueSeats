import { injectable } from 'inversify';
import { Booking } from '../../domain/entities/Booking';
import { IBookingRepository } from '../../domain/repositories/IBookingRepository';
import BookingModel from '../models/BookingModel';

@injectable()
export class BookingRepository implements IBookingRepository {
  async findById(id: number): Promise<Booking | null> {
    const bookingModel = await BookingModel.findByPk(id);
    if (!bookingModel) return null;
    return bookingModel.toJSON() as Booking;
  }

  async findByUserId(userId: number): Promise<Booking[]> {
    const bookingModels = await BookingModel.findAll({ where: { userId } });
    return bookingModels.map(bookingModel => bookingModel.toJSON() as Booking);
  }

  async findByEventId(eventId: number): Promise<Booking[]> {
    const bookingModels = await BookingModel.findAll({ where: { eventId } });
    return bookingModels.map(bookingModel => bookingModel.toJSON() as Booking);
  }

  async findByUserAndEvent(userId: number, eventId: number): Promise<Booking | null> {
    const bookingModel = await BookingModel.findOne({ where: { userId, eventId } });
    if (!bookingModel) return null;
    return bookingModel.toJSON() as Booking;
  }

  async findAll(): Promise<Booking[]> {
    const bookingModels = await BookingModel.findAll();
    return bookingModels.map(bookingModel => bookingModel.toJSON() as Booking);
  }

  async create(booking: Omit<Booking, 'id'>): Promise<Booking> {
    const newBooking = await BookingModel.create(booking);
    return newBooking.toJSON() as Booking;
  }

  async update(id: number, entity: Partial<Booking>): Promise<Booking | null> {
    const bookingModel = await BookingModel.findByPk(id);
    if (!bookingModel) return null;
    await bookingModel.update(entity);
    return bookingModel.toJSON() as Booking;
  }

  async delete(id: number): Promise<void> {
    await BookingModel.destroy({ where: { id } });
  }
}
