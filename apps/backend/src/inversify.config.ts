import { Container } from "inversify";
import { TYPES } from "./inversify.types";
import { IUserRepository } from "./domain/repositories/IUserRepository";
import { UserRepository } from "./infrastructure/repositories/UserRepository";
import { CreateUserUseCase } from "./application/useCases/createUserUseCase";
import { LoginUserUseCase } from "./application/useCases/loginUserUseCase";
import { RefreshTokenUseCase } from "./application/useCases/refreshTokenUseCase";
import { UserController } from "./presentation/controllers/UserController";

const container = new Container();

// repositories
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository).inSingletonScope();

// controllers
container.bind<UserController>(TYPES.UserController).to(UserController).inSingletonScope();

// use cases
container.bind<CreateUserUseCase>(TYPES.CreateUserUseCase).to(CreateUserUseCase).inSingletonScope();
container.bind<LoginUserUseCase>(TYPES.LoginUserUseCase).to(LoginUserUseCase).inSingletonScope();
container.bind<RefreshTokenUseCase>(TYPES.RefreshTokenUseCase).to(RefreshTokenUseCase).inSingletonScope();


export { container };