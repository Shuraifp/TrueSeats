import { HttpStatus } from "../constants/HTTPStatus";
import { AppError } from "./AppError";

export class ConflictError extends AppError {
    constructor(message: string) {
        super(message, HttpStatus.BAD_REQUEST, true);
    }
}