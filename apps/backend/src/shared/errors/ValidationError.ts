import { HttpStatus } from "../constants/HTTPStatus";
import { AppError } from "./AppError";

export class ValidationError extends AppError {
    public readonly details?: unknown;
    constructor(message = "Validation error", details?: unknown) {
        super(message, HttpStatus.BAD_REQUEST, true);
        this.details = details;
    }
}
