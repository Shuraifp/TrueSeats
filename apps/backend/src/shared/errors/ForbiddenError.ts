import { HttpStatus } from "../constants/HTTPStatus";
import { AppError } from "./AppError";

export class ForbiddenError extends AppError {
    constructor(message = "Forbidden") {
        super(message, HttpStatus.FORBIDDEN, true);
    }
}
