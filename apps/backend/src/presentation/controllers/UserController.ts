import { injectable, inject } from "inversify";
import { Request, Response, NextFunction } from "express";
import { CreateUserUseCase } from "../../application/useCases/createUserUseCase";
import { LoginUserUseCase } from "../../application/useCases/loginUserUseCase";
import { RefreshTokenUseCase } from "../../application/useCases/refreshTokenUseCase";
import { TYPES } from "../../inversify.types";
import { UnauthorizedError } from "../../shared/errors";
import { HttpStatus } from "../../shared/constants/HTTPStatus";

@injectable()
export class UserController {
  constructor(
    @inject(TYPES.CreateUserUseCase) private createUser: CreateUserUseCase,
    @inject(TYPES.LoginUserUseCase) private loginUser: LoginUserUseCase,
    @inject(TYPES.RefreshTokenUseCase) private refreshToken: RefreshTokenUseCase
  ) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.createUser.execute(req.body);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...safeUser } = user;
      res.status(HttpStatus.CREATED).json({ data: safeUser });
    } catch (err) {
      next(err);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const tokens = await this.loginUser.execute(email, password);
      res.status(HttpStatus.OK).json({ data: tokens });
    } catch (err) {
      next(err);
    }
  };

  refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        throw new UnauthorizedError("Refresh token required");
      }
      const { accessToken } = await this.refreshToken.execute(refreshToken);
      res.status(HttpStatus.OK).json({ data: { accessToken } });
    } catch (err) {
      next(err);
    }
  };
}