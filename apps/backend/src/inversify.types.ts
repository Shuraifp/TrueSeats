export const TYPES = {
    IUserRepository: Symbol.for("IUserRepository"),
    ITokenService: Symbol.for("ITokenService"),
    IPasswordService: Symbol.for("IPasswordService"),
    RegisterUserUseCase: Symbol.for("RegisterUserUseCase"),
    LoginUserUseCase: Symbol.for("LoginUserUseCase"),
    RefreshTokenUseCase: Symbol.for("RefreshTokenUseCase"),
    AuthController: Symbol.for("AuthController"),
    EventController: Symbol.for("EventController"),
  };