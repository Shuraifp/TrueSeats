export const TYPES = {
    IUserRepository: Symbol.for("IUserRepository"),
    ITokenService: Symbol.for("ITokenService"),
    IPasswordService: Symbol.for("IPasswordService"),
    RegisterUserUseCase: Symbol.for("RegisterUserUseCase"),
    LoginUserUseCase: Symbol.for("LoginUserUseCase"),
    RefreshTokenUseCase: Symbol.for("RefreshTokenUseCase"),
    AuthController: Symbol.for("AuthController"),
    EventController: Symbol.for("EventController"),

    // Event Module
    IEventRepository: Symbol.for("IEventRepository"),
    IBookingRepository: Symbol.for("IBookingRepository"),
    CreateEventUseCase: Symbol.for("CreateEventUseCase"),
    UpdateEventUseCase: Symbol.for("UpdateEventUseCase"),
    GetEventByIdUseCase: Symbol.for("GetEventByIdUseCase"),
    GetAllEventsUseCase: Symbol.for("GetAllEventsUseCase"),
    BookTicketUseCase: Symbol.for("BookTicketUseCase"),
    GetUserBookingHistoryUseCase: Symbol.for("GetUserBookingHistoryUseCase"),
    GetAllBookingsUseCase: Symbol.for("GetAllBookingsUseCase"),
  };