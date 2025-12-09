import { Request, Response, NextFunction } from "express";
import { AppError } from "../../shared/errors";
import { HttpStatus } from "../../shared/constants/HTTPStatus";

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: "error",
            name: err.name,
            message: err.message,
            details: (err as any).details ?? undefined,
        });
    }

    // eslint-disable-next-line no-console
    console.error("Unexpected error", err);

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: "error",
        name: "InternalServerError",
        message: "An unexpected error occurred",
    });
}
