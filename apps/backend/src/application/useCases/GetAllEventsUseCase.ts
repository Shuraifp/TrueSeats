import { injectable, inject } from 'inversify';
import { IEventRepository } from '../../domain/repositories/IEventRepository';
import { EventResponseDTO } from '../dtos/EventDTOs';
import { TYPES } from '../../inversify.types';

@injectable()
export class GetAllEventsUseCase {
  constructor(
    @inject(TYPES.IEventRepository) private readonly _eventRepository: IEventRepository
  ) {}

  public async execute(): Promise<EventResponseDTO[]> {
    const events = await this._eventRepository.findAll();
    return events.map(event => ({
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date,
      availableSeats: event.availableSeats,
      creatorId: event.creatorId,
    }));
  }
}
