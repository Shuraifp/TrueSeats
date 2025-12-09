import bcrypt from "bcrypt";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";
import { ValidationError } from "../../shared/errors";

export class CreateUserUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(payload: Omit<User, "id">): Promise<User> {
    if (!payload.email || !payload.password || !payload.name) {
      throw new ValidationError("Name, email and password are required");
    }

    if (payload.password.length < 6) {
      throw new ValidationError("Password must be at least 6 characters");
    }

    const hashed = await bcrypt.hash(payload.password, 10);
    const userToCreate = { ...payload, password: hashed };

    const created = await this.userRepo.create(userToCreate);
    return created;
  }
}
