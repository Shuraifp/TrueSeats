import { injectable, inject } from 'inversify';
import { IEventRepository } from '../../domain/repositories/IEventRepository';
import { EventResponseDTO } from '../dtos/EventDTOs';
import { TYPES } from '../../inversify.types';
import { NotFoundError } from '../../shared/errors';

@injectable()
export class GetEventByIdUseCase {
  constructor(
    @inject(TYPES.IEventRepository) private readonly _eventRepository: IEventRepository
  ) {}

  public async execute(eventId: number): Promise<EventResponseDTO> {
    const event = await this._eventRepository.findById(eventId);

    if (!event) {
      throw new NotFoundError(`Event with ID ${eventId} not found.`);
    }

    return {
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date,
      availableSeats: event.availableSeats,
      creatorId: event.creatorId,
    };
  }
}
