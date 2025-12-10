import { Role } from '../../domain/entities/User';

export interface CreateEventRequestDTO {
  title: string;
  description: string;
  date: Date;
  availableSeats: number;
}

export interface UpdateEventRequestDTO {
  title?: string;
  description?: string;
  date?: Date;
  availableSeats?: number;
}

export interface EventResponseDTO {
  id: number;
  title: string;
  description: string;
  date: Date;
  availableSeats: number;
  creatorId: number;
}
