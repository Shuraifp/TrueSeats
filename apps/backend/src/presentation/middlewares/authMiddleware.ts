import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError, ForbiddenError } from "../../shared/errors"; // ForbiddenError new, defined below
import { JWT_CONFIG } from "../../shared/constants/JWTConfig";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthorizedError("No token provided");
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_CONFIG.ACCESS_SECRET!) as { id: number; role: string };
        (req as any).user = decoded;
        next();
    } catch (err) {
        throw new UnauthorizedError("Invalid token");
    }
};

export const authorize = (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user || !roles.includes(user.role)) {
        throw new ForbiddenError("Access denied");
    }
    next();
};