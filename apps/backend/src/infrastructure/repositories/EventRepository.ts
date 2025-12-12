import { injectable } from 'inversify';
import { Event } from '../../domain/entities/Event';
import { IEventRepository } from '../../domain/repositories/IEventRepository';
import EventModel from '../models/EventModel';

@injectable()
export class EventRepository implements IEventRepository {
  async findById(id: number): Promise<Event | null> {
    const eventModel = await EventModel.findByPk(id);
    if (!eventModel) return null;
    return eventModel.toJSON() as Event;
  }

  async findByCreatorId(creatorId: number): Promise<Event[]> {
    const eventModels = await EventModel.findAll({ where: { creatorId } });
    return eventModels.map(eventModel => eventModel.toJSON() as Event);
  }

  async findAll(): Promise<Event[]> {
    const eventModels = await EventModel.findAll();
    return eventModels.map(eventModel => eventModel.toJSON() as Event);
  }

  async create(event: Omit<Event, 'id'>): Promise<Event> {
    const newEvent = await EventModel.create(event);
    return newEvent.toJSON() as Event;
  }

  async update(id: number, entity: Partial<Event>): Promise<Event | null> {
    const eventModel = await EventModel.findByPk(id);
    if (!eventModel) return null;
    await eventModel.update(entity);
    return eventModel.toJSON() as Event;
  }

  async updateAvailableSeats(eventId: number, newAvailableSeats: number): Promise<Event | null> {
    const eventModel = await EventModel.findByPk(eventId);
    if (!eventModel) return null;
    await eventModel.update({ availableSeats: newAvailableSeats });
    return eventModel.toJSON() as Event;
  }

  async delete(id: number): Promise<void> {
    await EventModel.destroy({ where: { id } });
  }
}



