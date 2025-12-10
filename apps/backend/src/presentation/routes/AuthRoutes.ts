import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { container } from '../../inversify.config';
import { TYPES } from '../../inversify.types';
import { body } from 'express-validator';
import { Role } from '../../domain/entities/User';

const authRouter = Router();
const authController = container.get<AuthController>(TYPES.AuthController);

authRouter.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('role').isIn([Role.Admin, Role.User]).withMessage('Role must be either user or admin'),
  ],
  authController.register.bind(authController)
);

authRouter.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  authController.login.bind(authController)
);

authRouter.post('/refresh-token', authController.refresh.bind(authController));

authRouter.post('/logout', authController.logout.bind(authController));

export default authRouter;

