import dotenv from "dotenv"
import { injectable, inject } from "inversify";
import jwt from "jsonwebtoken";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { UnauthorizedError } from "../../shared/errors";
import { JWT_CONFIG } from "../../shared/constants/JWTConfig";
import { TYPES } from "../../../inversify.types";
dotenv.config()

@injectable()
export class RefreshTokenUseCase {
  constructor(@inject(TYPES.IUserRepository) private userRepo: IUserRepository) {}

  async execute(refreshToken: string): Promise<{ accessToken: string }> {
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, JWT_CONFIG.REFRESH_SECRET) as { id: number };
    } catch (err) {
      throw new UnauthorizedError("Invalid refresh token");
    }

    const user = await this.userRepo.findById(decoded.id);
    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      JWT_CONFIG.ACCESS_SECRET,
      { expiresIn: JWT_CONFIG.ACCESS_EXPIRY }
    );

    return { accessToken };
  }
}