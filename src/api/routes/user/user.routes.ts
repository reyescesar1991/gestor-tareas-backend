import { container } from "tsyringe";
import { Router } from 'express';
import { UserController } from "../../../controllers/user/user.controller";
import { validateCreateUserData } from "../../middleware/user/createUser.middleware";
import { authMiddleware } from "../../middleware/auth.middleware";

// Esto nos da una instancia del AuthController con todas sus dependencias ya inyectadas
const userController = container.resolve(UserController);

const router = Router();

router.post('/create-user', validateCreateUserData, userController.createUser);
// Esta ruta es para que un usuario obtenga su propio perfil.
// Es un GET, está protegida y no necesita recibir un ID, ya que lo toma del token.
// La convención '/me' es muy común para este propósito.
router.get('/me', authMiddleware, userController.getOwnProfile);
router.get('/get-users', userController.getUsers);
router.post('/get-user-by-username', userController.findUserByUsername);


export default router;