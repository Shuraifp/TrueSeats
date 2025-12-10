import { Router } from 'express';
import { container } from '../../inversify.config';
import { TYPES } from '../../inversify.types';
import { EventController } from '../controllers/EventController';
import { authMiddleware, roleMiddleware } from '../../main/middlewares/authMiddleware';
import { Role } from '../../domain/entities/User';
import { body } from 'express-validator';

const eventRouter = Router();
const eventController = container.get<EventController>(TYPES.EventController);

// Public routes
eventRouter.get('/', (req, res, next) => eventController.getAllEvents(req, res, next));
eventRouter.get('/:id', (req, res, next) => eventController.getEventById(req, res, next));

// Admin routes
eventRouter.post(
  '/',
  authMiddleware,
  roleMiddleware([Role.Admin]),
  [ 
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('date').isISO8601().withMessage('Valid date is required (YYYY-MM-DD)'),
    body('availableSeats').isInt({ min: 1 }).withMessage('Available seats must be a positive integer'),
  ],
  eventController.createEvent.bind(eventController)
);

eventRouter.put(
  '/:id',
  authMiddleware,
  roleMiddleware([Role.Admin]),
  [
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('description').optional().notEmpty().withMessage('Description cannot be empty'),
    body('date').optional().isISO8601().withMessage('Valid date is required (YYYY-MM-DD)'),
    body('availableSeats').optional().isInt({ min: 0 }).withMessage('Available seats must be a non-negative integer'),
  ],
  eventController.updateEvent.bind(eventController)
);

// User and Admin routes for booking
eventRouter.post(
  '/:id/book',
  authMiddleware,
  roleMiddleware([Role.User, Role.Admin]),
  [
    body('ticketsBooked').isInt({ min: 1 }).withMessage('At least 1 ticket must be booked'),
  ],
  eventController.bookTicket.bind(eventController)
);

// User routes for booking history
eventRouter.get(
  '/bookings/me',
  authMiddleware,
  roleMiddleware([Role.User, Role.Admin]),
  (req, res, next) => eventController.getUserBookingHistory(req, res, next)
);

export default eventRouter;

