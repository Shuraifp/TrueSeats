import bcrypt from 'bcrypt';
import { injectable } from 'inversify';
import { IPasswordService } from '../../domain/services/IPasswordService';

@injectable()
export class BcryptPasswordService implements IPasswordService {
  private readonly saltRounds = 10;

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

