import { Router } from 'express';
import { container } from '../../inversify.config';
import { TYPES } from '../../inversify.types';
import { EventController } from '../controllers/EventController';
import { authMiddleware, roleMiddleware } from '../../main/middlewares/authMiddleware';
import { Role } from '../../domain/entities/User';

const eventRouter = Router();
const eventController = container.get<EventController>(TYPES.EventController);

// Public route: Get all events
eventRouter.get('/', (req, res, next) => eventController.getEvents(req, res, next));

// Public route: Get event by ID
eventRouter.get('/:id', (req, res, next) => eventController.getEventById(req, res, next));

// Protected route: Create event (only for Admins)
eventRouter.post(
  '/',
  authMiddleware,
  roleMiddleware([Role.Admin]),
  (req, res, next) => eventController.createEvent(req, res, next)
);

export default eventRouter;

