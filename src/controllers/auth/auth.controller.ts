import { delay, inject, injectable } from "tsyringe";
import { AuthService } from "../../services/auth/Auth.service";
import { Request, Response, NextFunction } from "express";
import { logger } from "../../core/logger/logger";
import { LoginAuthDto } from "../../core/zodValidators/auth.zod-validator";
import { sendSuccessResponse } from "../../core/helper/api/successResponse.helper";


@injectable()
export class AuthController {

    constructor(
        @inject("AuthService") private readonly authService: AuthService
    ) { }

    public loginUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {

        try {

            logger.info('AuthController: Inicio del proceso de login'); // Inicio del método

            const loginAuthDto: LoginAuthDto = req.body;

            logger.info('AuthController: Datos enviados por el usuario', loginAuthDto);

            // 1. Llama al servicio de crear tarea
            logger.info('AuthController: Llamando al servicio AuthService.loginAuthDto.');
            const result = await this.authService.loginUser(loginAuthDto);

            logger.info(`AuthController: login creado de forma exitosa.`);
            logger.debug({ message: 'AuthController: Preparando respuesta de éxito: ', data: result });
            sendSuccessResponse(res, 200, result, "Login exitoso");


        } catch (error) {

            // Log de error en el catch
            logger.error({ message: 'AuthController: Error durante el login del usuario', error });
            // Si el código es incorrecto, el servicio lanzará una excepción que será manejada aquí.
            next(error);
        }
    }
}
