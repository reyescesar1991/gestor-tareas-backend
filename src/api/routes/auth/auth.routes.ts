import { container } from "tsyringe";
import { Router } from 'express';
import { AuthController } from "../../../controllers/auth/auth.controller";
import { validateLoginData } from "../../middleware/auth/auth.middleware";

// Esto nos da una instancia del AuthController con todas sus dependencias ya inyectadas
const authController = container.resolve(AuthController);

const router = Router();

router.post('/login', validateLoginData, authController.loginUser);

export default router;