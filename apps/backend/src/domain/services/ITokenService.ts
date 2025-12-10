import { Role } from "../entities/User";

export interface ITokenService {
  generateAccessToken(userId: number, userRole: Role): string;
  generateRefreshToken(userId: number): string;
  verifyAccessToken(token: string): { userId: number; userRole: Role, iat: number, exp: number } | null;
  verifyRefreshToken(token: string): { userId: number, iat: number, exp: number } | null;
}

