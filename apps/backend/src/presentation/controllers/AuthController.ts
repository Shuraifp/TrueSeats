import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { SigninUserUseCase } from '../../application/useCases/SigninUserUseCase';
import { RegisterUserUseCase } from '../../application/useCases/RegisterUserUseCase';
import { RefreshTokenUseCase } from '../../application/useCases/refreshTokenUseCase';
import { TYPES } from '../../inversify.types';
import { JWT_CONFIG } from '../../shared/constants/JWTConfig';
import { UnauthorizedError } from '../../shared/errors/UnauthorizedError';

@injectable()
export class AuthController {
  constructor(
    @inject(TYPES.RegisterUserUseCase) private registerUserUseCase: RegisterUserUseCase,
    @inject(TYPES.LoginUserUseCase) private loginUserUseCase: SigninUserUseCase,
    @inject(TYPES.RefreshTokenUseCase) private refreshTokenUseCase: RefreshTokenUseCase
  ) { }

  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const authResponse = await this.registerUserUseCase.execute(req.body);
      res.cookie('refreshToken', authResponse.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: JWT_CONFIG.REFRESH_EXPIRY_MS,
      });
      res.status(StatusCodes.CREATED).json({ accessToken: authResponse.accessToken, refreshToken: authResponse.refreshToken, user: authResponse.user });
    } catch (error: any) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const authResponse = await this.loginUserUseCase.execute(req.body);
      res.cookie('refreshToken', authResponse.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: JWT_CONFIG.REFRESH_EXPIRY_MS,
      });
      res.status(StatusCodes.OK).json({ accessToken: authResponse.accessToken, refreshToken: authResponse.refreshToken, user: authResponse.user });
    } catch (error: any) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthorizedError("No token provided");
    }

    const refreshToken = authHeader.split(" ")[1];
      if (!refreshToken) {
        throw new UnauthorizedError('Refresh token not found');
      }
      console.log(refreshToken)
      const authResponse = await this.refreshTokenUseCase.execute(refreshToken);
      res.status(StatusCodes.OK).json({ accessToken: authResponse.accessToken, userRole: authResponse.user.role });
    } catch (error: any) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });
      res.status(StatusCodes.OK).json({ message: 'Logged out successfully' });
    } catch (error: any) {
      next(error);
    }
  }
}