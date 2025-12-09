import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";
import UserModel from "../models/UserModel";
import { DatabaseError } from "../../shared/errors/DatabaseError";

export class UserRepository implements IUserRepository {
    async create(entity: Omit<User, "id">): Promise<User> {
        try {
            const created = await UserModel.create(entity);
            return created.toJSON() as User;
        } catch (err) {
            throw new DatabaseError((err as Error).message || "Failed to create user");
        }
    }

    async findById(id: number): Promise<User | null> {
        try {
            const user = await UserModel.findByPk(id);
            return user ? (user.toJSON() as User) : null;
        } catch (err) {
            throw new DatabaseError("Failed to fetch user by id");
        }
    }

    async findAll(): Promise<User[]> {
        try {
            const users = await UserModel.findAll();
            return users.map(u => u.toJSON() as User);
        } catch (err) {
            throw new DatabaseError("Failed to fetch all users");
        }
    }

    async update(entity: User): Promise<User> {
        try {
            await UserModel.update(entity, { where: { id: entity.id } });
            return entity;
        } catch (err) {
            throw new DatabaseError("Failed to update user");
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await UserModel.destroy({ where: { id } });
        } catch (err) {
            throw new DatabaseError("Failed to delete user");
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        try {
            const user = await UserModel.findOne({ where: { email } });
            return user ? (user.toJSON() as User) : null;
        } catch (err) {
            throw new DatabaseError("Failed to fetch user by email");
        }
    }
}
