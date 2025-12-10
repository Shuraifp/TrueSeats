import { Container } from 'inversify';
import { TYPES } from './inversify.types';
import { IUserRepository } from './domain/repositories/IUserRepository';
import { UserRepository } from './infrastructure/repositories/UserRepository';
import { IPasswordService } from './domain/services/IPasswordService';
import { BcryptPasswordService } from './infrastructure/services/BcryptPasswordService';
import { ITokenService } from './domain/services/ITokenService';
import { JwtService } from './infrastructure/services/JwtService';
import { RegisterUserUseCase } from './application/useCases/RegisterUserUseCase';

import { SigninUserUseCase } from './application/useCases/SigninUserUseCase';
import { RefreshTokenUseCase } from './application/useCases/refreshTokenUseCase';
import { AuthController } from './presentation/controllers/AuthController';
import { EventController } from './presentation/controllers/EventController';

// Event Module Imports
import { IEventRepository } from './domain/repositories/IEventRepository';
import { EventRepository } from './infrastructure/repositories/EventRepository';
import { IBookingRepository } from './domain/repositories/IBookingRepository';
import { BookingRepository } from './infrastructure/repositories/BookingRepository';
import { CreateEventUseCase } from './application/useCases/CreateEventUseCase';
import { UpdateEventUseCase } from './application/useCases/UpdateEventUseCase';
import { GetEventByIdUseCase } from './application/useCases/GetEventByIdUseCase';
import { GetAllEventsUseCase } from './application/useCases/GetAllEventsUseCase';
import { BookTicketUseCase } from './application/useCases/BookTicketUseCase';
import { GetUserBookingHistoryUseCase } from './application/useCases/GetUserBookingHistoryUseCase';

const container = new Container();

// Repositories
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository).inSingletonScope();
container.bind<IEventRepository>(TYPES.IEventRepository).to(EventRepository).inSingletonScope();
container.bind<IBookingRepository>(TYPES.IBookingRepository).to(BookingRepository).inSingletonScope();

// Services
container.bind<IPasswordService>(TYPES.IPasswordService).to(BcryptPasswordService).inSingletonScope();
container.bind<ITokenService>(TYPES.ITokenService).to(JwtService).inSingletonScope();

// Use Cases
container.bind<RegisterUserUseCase>(TYPES.RegisterUserUseCase).to(RegisterUserUseCase).inSingletonScope();
container.bind<SigninUserUseCase>(TYPES.LoginUserUseCase).to(SigninUserUseCase).inSingletonScope();
container.bind<RefreshTokenUseCase>(TYPES.RefreshTokenUseCase).to(RefreshTokenUseCase).inSingletonScope();
container.bind<CreateEventUseCase>(TYPES.CreateEventUseCase).to(CreateEventUseCase).inSingletonScope();
container.bind<UpdateEventUseCase>(TYPES.UpdateEventUseCase).to(UpdateEventUseCase).inSingletonScope();
container.bind<GetEventByIdUseCase>(TYPES.GetEventByIdUseCase).to(GetEventByIdUseCase).inSingletonScope();
container.bind<GetAllEventsUseCase>(TYPES.GetAllEventsUseCase).to(GetAllEventsUseCase).inSingletonScope();
container.bind<BookTicketUseCase>(TYPES.BookTicketUseCase).to(BookTicketUseCase).inSingletonScope();
container.bind<GetUserBookingHistoryUseCase>(TYPES.GetUserBookingHistoryUseCase).to(GetUserBookingHistoryUseCase).inSingletonScope();

// Controllers
container.bind<AuthController>(TYPES.AuthController).to(AuthController).inSingletonScope();
container.bind<EventController>(TYPES.EventController).to(EventController).inSingletonScope();

export { container };