import { Request, Response, NextFunction } from 'express';
import { container } from '../../inversify.config';
import { TYPES } from '../../inversify.types';
import { ITokenService } from '../../domain/services/ITokenService';
import { UnauthorizedError, ForbiddenError } from '../../shared/errors';
import { Role } from '../../domain/entities/User';

declare global {
  namespace Express {
    interface Request {
      userId?: number;
      userRole?: Role;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const tokenService = container.get<ITokenService>(TYPES.ITokenService);

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new UnauthorizedError('No token provided.'));
  }

  const token = authHeader.split(' ')[1];
  const decoded = tokenService.verifyAccessToken(token);

  if (!decoded) {
    return next(new UnauthorizedError('Invalid or expired token.'));
  }

  req.userId = decoded.userId;
  req.userRole = decoded.userRole;
  next();
};

export const roleMiddleware = (roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.userRole || !roles.includes(req.userRole)) {
      return next(new ForbiddenError('Access denied.'));
    }
    next();
  };
};

