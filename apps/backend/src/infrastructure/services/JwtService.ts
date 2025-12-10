import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { injectable } from 'inversify';
import { JWT_CONFIG } from '../../shared/constants/JWTConfig';
import { ITokenService } from '../../domain/services/ITokenService';
import { Role } from '../../domain/entities/User';

@injectable()
export class JwtService implements ITokenService {
  generateAccessToken(userId: number, userRole: 'user' | 'admin'): string {
    const secret: Secret = JWT_CONFIG.ACCESS_SECRET;
    const duration: SignOptions["expiresIn"] = JWT_CONFIG.ACCESS_EXPIRY
    return jwt.sign(
      { userId, userRole },
      secret,
      { expiresIn: duration }
    );
  }

  generateRefreshToken(userId: number): string {
    const secret: Secret = JWT_CONFIG.REFRESH_SECRET!;
    return jwt.sign(
      { userId },
      secret,
      { expiresIn: JWT_CONFIG.REFRESH_EXPIRY }
    );
  }

  verifyAccessToken(token: string): { userId: number; userRole: Role; iat: number; exp: number } | null {
    try {
      const secret: Secret = JWT_CONFIG.ACCESS_SECRET!;
      const decoded = jwt.verify(token, secret) as {
        userId: number;
        userRole: Role;
        iat: number;
        exp: number;
      };
      return decoded;
    } catch (error) {
      return null;
    }
  }

  verifyRefreshToken(token: string): { userId: number; iat: number; exp: number } | null {
    try {
      const secret: Secret = JWT_CONFIG.REFRESH_SECRET!;
      const decoded = jwt.verify(token, secret) as {
        userId: number;
        iat: number;
        exp: number;
      };
      return decoded;
    } catch (error) {
      return null;
    }
  }
}

