import { injectable, inject } from 'inversify';
import { LoginRequestDTO, AuthResponseDTO } from '../dtos/AuthDTOs';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { IPasswordService } from '../../domain/services/IPasswordService';
import { ITokenService } from '../../domain/services/ITokenService';
import { TYPES } from '../../inversify.types';
import { UnauthorizedError } from '../../shared/errors/UnauthorizedError';

@injectable()
export class SigninUserUseCase {
  constructor(
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
    @inject(TYPES.IPasswordService) private passwordService: IPasswordService,
    @inject(TYPES.ITokenService) private tokenService: ITokenService
  ) {}

  async execute(credentials: LoginRequestDTO): Promise<AuthResponseDTO & { refreshToken: string }> {
    const user = await this.userRepository.findByEmail(credentials.email);

    if (!user || !(await this.passwordService.comparePassword(credentials.password, user.password))) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const accessToken = this.tokenService.generateAccessToken(user.id!, user.role);
    const refreshToken = this.tokenService.generateRefreshToken(user.id!);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id!,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}
