import { Container } from 'inversify';
import { TYPES } from './inversify.types';
import { IUserRepository } from './domain/repositories/IUserRepository';
import { UserRepository } from './infrastructure/repositories/UserRepository';
import { IPasswordService } from './domain/services/IPasswordService';
import { BcryptPasswordService } from './infrastructure/services/BcryptPasswordService';
import { ITokenService } from './domain/services/ITokenService';
import { JwtService } from './infrastructure/services/JwtService';
import { RegisterUserUseCase } from './application/useCases/RegisterUserUseCase';
import { LoginUserUseCase } from './application/useCases/LoginUserUseCase';
import { RefreshTokenUseCase } from './application/useCases/refreshTokenUseCase';
import { AuthController } from './presentation/controllers/AuthController';
import { EventController } from './presentation/controllers/EventController';

const container = new Container();

// Repositories
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository).inSingletonScope();

// Services
container.bind<IPasswordService>(TYPES.IPasswordService).to(BcryptPasswordService).inSingletonScope();
container.bind<ITokenService>(TYPES.ITokenService).to(JwtService).inSingletonScope();

// Use Cases
container.bind<RegisterUserUseCase>(TYPES.RegisterUserUseCase).to(RegisterUserUseCase).inSingletonScope();
container.bind<LoginUserUseCase>(TYPES.LoginUserUseCase).to(LoginUserUseCase).inSingletonScope();
container.bind<RefreshTokenUseCase>(TYPES.RefreshTokenUseCase).to(RefreshTokenUseCase).inSingletonScope();

// Controllers
container.bind<AuthController>(TYPES.AuthController).to(AuthController).inSingletonScope();
container.bind<EventController>(TYPES.EventController).to(EventController).inSingletonScope();

export { container };