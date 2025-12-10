import { injectable, inject } from 'inversify';
import { ITokenService } from '../../domain/services/ITokenService';
import { TYPES } from '../../inversify.types';
import { UnauthorizedError } from '../../shared/errors';
import { RefreshTokenResponseDTO } from '../dtos/AuthDTOs';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject(TYPES.ITokenService) private readonly _tokenService: ITokenService,
    @inject(TYPES.IUserRepository) private readonly _userRepository: IUserRepository
  ) {}

  public async execute(refreshToken: string): Promise<RefreshTokenResponseDTO> {
    const decoded = this._tokenService.verifyRefreshToken(refreshToken);

    if (!decoded || !decoded.userId) {
      throw new UnauthorizedError('Invalid refresh token.');
    }

    const user = await this._userRepository.findById(decoded.userId);
    if (!user) {
      throw new UnauthorizedError('User not found.');
    }

    const newAccessToken = this._tokenService.generateAccessToken(user.id!, user.role);

    return {
      accessToken: newAccessToken,
      user: {
        id: user.id!,
        email: user.email,
        role: user.role,
      },
    };
  }
}