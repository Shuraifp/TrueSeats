import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { TYPES } from '../../inversify.types';
import { CreateEventUseCase } from '../../application/useCases/CreateEventUseCase';
import { UpdateEventUseCase } from '../../application/useCases/UpdateEventUseCase';
import { GetEventByIdUseCase } from '../../application/useCases/GetEventByIdUseCase';
import { GetAllEventsUseCase } from '../../application/useCases/GetAllEventsUseCase';
import { BookTicketUseCase } from '../../application/useCases/BookTicketUseCase';
import { GetUserBookingHistoryUseCase } from '../../application/useCases/GetUserBookingHistoryUseCase';
import { NotFoundError, ForbiddenError, ConflictError, ValidationError } from '../../shared/errors';
import { Role } from '../../domain/entities/User';

@injectable()
export class EventController {
  constructor(
    @inject(TYPES.CreateEventUseCase) private readonly _createEventUseCase: CreateEventUseCase,
    @inject(TYPES.UpdateEventUseCase) private readonly _updateEventUseCase: UpdateEventUseCase,
    @inject(TYPES.GetEventByIdUseCase) private readonly _getEventByIdUseCase: GetEventByIdUseCase,
    @inject(TYPES.GetAllEventsUseCase) private readonly _getAllEventsUseCase: GetAllEventsUseCase,
    @inject(TYPES.BookTicketUseCase) private readonly _bookTicketUseCase: BookTicketUseCase,
    @inject(TYPES.GetUserBookingHistoryUseCase) private readonly _getUserBookingHistoryUseCase: GetUserBookingHistoryUseCase,
  ) { }

  public async createEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.userId!;
      const newEvent = await this._createEventUseCase.execute(req.body, userId);
      res.status(StatusCodes.CREATED).json(newEvent);
    } catch (error) {
      next(error);
    }
  }

  public async updateEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.userId!;
      const userRole = req.userRole!;
      const updatedEvent = await this._updateEventUseCase.execute(Number(id), req.body, userId, userRole);
      res.status(StatusCodes.OK).json(updatedEvent);
    } catch (error) {
      next(error);
    }
  }

  public async getEventById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const event = await this._getEventByIdUseCase.execute(Number(id));
      res.status(StatusCodes.OK).json(event);
    } catch (error) {
      next(error);
    }
  }

  public async getAllEvents(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const events = await this._getAllEventsUseCase.execute();
      res.status(StatusCodes.OK).json(events);
    } catch (error: any) {
      next(error);
    }
  }

  public async bookTicket(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.userId!;
      const booking = await this._bookTicketUseCase.execute(userId, req.body);
      res.status(StatusCodes.CREATED).json(booking);
    } catch (error) {
      next(error);
    }
  }

  public async getUserBookingHistory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.userId!;
      const bookings = await this._getUserBookingHistoryUseCase.execute(userId);
      res.status(StatusCodes.OK).json(bookings);
    } catch (error) {
      next(error);
    }
  }
}

