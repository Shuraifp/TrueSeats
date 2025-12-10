import { Booking } from "../entities/Booking";
import { IBaseRepository } from "./IBaseRepository";

export interface IBookingRepository extends IBaseRepository<Booking> {
  findByUserId(userId: number): Promise<Booking[]>;
  findByEventId(eventId: number): Promise<Booking[]>;
  findByUserAndEvent(userId: number, eventId: number): Promise<Booking | null>;
}
