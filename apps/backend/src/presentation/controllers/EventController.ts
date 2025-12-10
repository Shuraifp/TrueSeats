import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../inversify.types';
import { RegisterUserUseCase } from '../../application/useCases/RegisterUserUseCase';

@injectable()
export class EventController {
  constructor(
    // @inject(TYPES.RegisterUserUseCase) private readonly _registerUserUseCase: RegisterUserUseCase,
  ) {
  }

  public async getEvents(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // This is a placeholder for fetching events.
      // In a real application, you would use an EventUseCase to fetch events.
      const events = [
        { id: 1, title: 'Concert Night', description: 'A night of amazing music.', date: '2025-12-25', availableSeats: 100, creatorId: (req as any).userId },
        { id: 2, title: 'Tech Conference', description: 'Innovation and future tech.', date: '2026-01-15', availableSeats: 50, creatorId: (req as any).userId },
      ];
      res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  }

  public async createEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Placeholder for event creation. Only accessible by Admins.
      const { title, description, date, availableSeats } = req.body;
      const newEvent = { id: 3, title, description, date, availableSeats, creatorId: (req as any).userId };
      res.status(201).json(newEvent);
    } catch (error) {
      next(error);
    }
  }

  public async getEventById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const event = { id: Number(id), title: 'Concert Night', description: 'A night of amazing music.', date: '2025-12-25', availableSeats: 100, creatorId: (req as any).userId };
      res.status(200).json(event);
    } catch (error) {
      next(error);
    }
  }
}

