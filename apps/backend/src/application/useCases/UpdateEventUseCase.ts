import { injectable, inject } from 'inversify';
import { IEventRepository } from '../../domain/repositories/IEventRepository';
import { UpdateEventRequestDTO, EventResponseDTO } from '../dtos/EventDTOs';
import { TYPES } from '../../inversify.types';
import { NotFoundError, ForbiddenError } from '../../shared/errors';

@injectable()
export class UpdateEventUseCase {
  constructor(
    @inject(TYPES.IEventRepository) private readonly _eventRepository: IEventRepository
  ) {}

  public async execute(eventId: number, eventData: UpdateEventRequestDTO, editorId: number, editorRole: 'user' | 'admin'): Promise<EventResponseDTO> {
    const existingEvent = await this._eventRepository.findById(eventId);
    if (!existingEvent) {
      throw new NotFoundError(`Event with ID ${eventId} not found.`);
    }

    if (editorRole !== 'admin' && existingEvent.creatorId !== editorId) {
      throw new ForbiddenError('You are not authorized to update this event.');
    }

    const updatedEvent = await this._eventRepository.update(eventId, eventData);

    if (!updatedEvent) {
      throw new Error('Failed to update event.'); 
    }

    return {
      id: updatedEvent.id,
      title: updatedEvent.title,
      description: updatedEvent.description,
      date: updatedEvent.date,
      availableSeats: updatedEvent.availableSeats,
      creatorId: updatedEvent.creatorId,
    };
  }
}
