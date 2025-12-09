
export interface IBaseRepository <T> {
    create(entity: Omit<T, "id">): Promise<T>;
    findById(id: number): Promise<T | null>;
    findAll(): Promise<T[]>;
    update(entity: T): Promise<T>;
    delete(id: number): Promise<void>;
}