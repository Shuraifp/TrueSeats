import { injectable, inject } from 'inversify';
import { IEventRepository } from '../../domain/repositories/IEventRepository';
import { CreateEventRequestDTO, EventResponseDTO } from '../dtos/EventDTOs';
import { TYPES } from '../../inversify.types';
import { ConflictError } from '../../shared/errors';

@injectable()
export class CreateEventUseCase {
  constructor(
    @inject(TYPES.IEventRepository) private readonly _eventRepository: IEventRepository
  ) {}

  public async execute(eventData: CreateEventRequestDTO, creatorId: number): Promise<EventResponseDTO> {

    const newEvent = await this._eventRepository.create({
      ...eventData,
      creatorId,
    });

    return {
      id: newEvent.id,
      title: newEvent.title,
      description: newEvent.description,
      date: newEvent.date,
      availableSeats: newEvent.availableSeats,
      creatorId: newEvent.creatorId,
    };
  }
}
