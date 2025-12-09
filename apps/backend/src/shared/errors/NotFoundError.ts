import { HttpStatus } from "../constants/HTTPStatus";
import { AppError } from "./AppError";

export class NotFoundError extends AppError {
    constructor(message = "Resource not found") {
        super(message, HttpStatus.NOT_FOUND, true);
    }
}
