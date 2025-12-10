
export interface IBaseRepository<T> {
    create(entity: Omit<T, "id">): Promise<T>;
    findById(id: number): Promise<T | null>;
    findAll(): Promise<T[]>;
    update(id: number, entity: Partial<T>): Promise<T | null>;
    delete(id: number): Promise<void>;
}