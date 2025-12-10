import { injectable, inject } from 'inversify';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { ITokenService } from '../../domain/services/ITokenService';
import { IPasswordService } from '../../domain/services/IPasswordService';
import { RegisterRequestDTO, AuthResponseDTO } from '../dtos/AuthDTOs';
import { TYPES } from '../../inversify.types';
import { User } from '../../domain/entities/User';
import { ConflictError, ValidationError } from '../../shared/errors';

@injectable()
export class RegisterUserUseCase {
  constructor(
    @inject(TYPES.IUserRepository) private readonly _userRepository: IUserRepository,
    @inject(TYPES.ITokenService) private readonly _tokenService: ITokenService,
    @inject(TYPES.IPasswordService) private readonly _passwordService: IPasswordService
  ) { }

  public async execute(data: RegisterRequestDTO): Promise<AuthResponseDTO & { refreshToken: string }> {
    const { name, email, password, role } = data;

    const existingUser = await this._userRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictError('User with this email already exists.');
    }

    const hashedPassword = await this._passwordService.hashPassword(password);

    const newUser = await this._userRepository.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const accessToken = this._tokenService.generateAccessToken(newUser.id, newUser.role);
    const refreshToken = this._tokenService.generateRefreshToken(newUser.id);

    return {
      accessToken,
      refreshToken,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    };
  }
}

