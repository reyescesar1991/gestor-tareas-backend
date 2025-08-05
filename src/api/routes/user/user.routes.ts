import { container } from "tsyringe";
import { Router } from 'express';
import { UserController } from "../../../controllers/user/user.controller";

// Esto nos da una instancia del AuthController con todas sus dependencias ya inyectadas
const userController = container.resolve(UserController);

const router = Router();

router.post('/create-user', userController.createUser);
router.get('/get-user', userController.findUser);
router.post('/get-user-by-username', userController.findUserByUsername);


export default router;