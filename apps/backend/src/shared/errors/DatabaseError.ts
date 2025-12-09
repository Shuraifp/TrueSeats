import { HttpStatus } from "../constants/HTTPStatus";
import { AppError } from "./AppError";

export class DatabaseError extends AppError {
    constructor(message: string) {
        super(message, HttpStatus.INTERNAL_SERVER_ERROR, true);
    }
}