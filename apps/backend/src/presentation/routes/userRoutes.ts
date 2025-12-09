import { Router } from "express";
import { container } from "../../inversify.config";
import { UserController } from "../controllers/UserController";
import { TYPES } from "../../inversify.types";

const router = Router();
const controller = container.get<UserController>(TYPES.UserController);

router.post("/register", (req, res, next) => controller.register(req, res, next));
router.post("/login", (req, res, next) => controller.login(req, res, next));
router.post("/refresh", (req, res, next) => controller.refresh(req, res, next));

export default router;