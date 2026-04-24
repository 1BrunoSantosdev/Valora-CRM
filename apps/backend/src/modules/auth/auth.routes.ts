import { Router } from "express";
import * as authController from "./auth.controller";
import { loginSchema, registerSchema } from "../../schemas/auth.schema";    
import { validate } from "../../middlewares/validate";

const router = Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);

export default router;