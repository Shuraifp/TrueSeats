import { Event } from "../entities/Event";
import { IBaseRepository } from "./IBaseRepository";

export interface IEventRepository extends IBaseRepository<Event> {
  findByCreatorId(creatorId: number): Promise<Event[]>;
  updateAvailableSeats(eventId: number, newAvailableSeats: number): Promise<Event | null>;
}
