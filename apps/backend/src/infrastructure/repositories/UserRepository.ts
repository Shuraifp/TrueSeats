import { injectable } from 'inversify';
import { User, Role as UserRoleType } from '../../../src/domain/entities/User'; // Adjust path
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import UserModel from '../models/UserModel';

@injectable()
export class UserRepository implements IUserRepository {
  async findById(id: number): Promise<User | null> {
    const userModel = await UserModel.findByPk(id);
    if (!userModel) return null;
    return userModel.toJSON() as User;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userModel = await UserModel.findOne({ where: { email } });
    if (!userModel) return null;
    return userModel.toJSON() as User;
  }

  async findAll(): Promise<User[]> {
    const userModels = await UserModel.findAll();
    return userModels.map(userModel => userModel.toJSON() as User);
  }

  async create(user: Omit<User, 'id'>): Promise<User> {
    const newUser = await UserModel.create(user);
    return newUser.toJSON() as User;
  }

  async update(id: number, entity: Partial<User>): Promise<User | null> {
    const userModel = await UserModel.findByPk(id);
    if (!userModel) return null;
    await userModel.update(entity);
    return userModel.toJSON() as User;
  }

  async delete(id: number): Promise<void> {
    await UserModel.destroy({ where: { id } });
  }
}
