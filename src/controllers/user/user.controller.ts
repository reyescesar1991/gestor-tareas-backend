import { delay, inject, injectable } from "tsyringe";
import { UserService } from "../../services/user/User.service";
import { Request, Response, NextFunction } from "express";
import { logger } from "../../core/logger/logger";
import { UserDto } from "../../core/zodValidators";
import { sendSuccessResponse } from "../../core/helper/api/successResponse.helper";
import { ObjectIdParam } from "../../core/zodValidators/idMongo.validator";

@injectable()
export class UserController {

    constructor(
        @inject(delay(() => UserService)) private readonly userService: UserService
    ) { }

    /*
    * Verifica la existencia del usuario en el sistema para validarlo
    */
    public createUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {

        try {

            logger.info('UserController: Inicio del proceso de creacion de usuario'); // Inicio del método

            const createUser: UserDto = req.body;

            logger.info('UserController: Datos enviados por el usuario', createUser);

            // 1. Llama al servicio de crear usuario
            logger.info('UserController: Llamando al servicio UserService.createUser.');
            const result = await this.userService.createUser(createUser);

            logger.info(`UserController: Usuario creado de forma exitosa.`);
            logger.debug({ message: 'UserController: Preparando respuesta de éxito: ', data: result });
            sendSuccessResponse(res, 201, result, "Usuario creado exitosamente");
            
        } catch (error) {
            
            // Log de error en el catch
            logger.error({ message: 'DataUserController: Error durante la creacion del usuario', error });
            // Si el código es incorrecto, el servicio lanzará una excepción que será manejada aquí.
            next(error);
        }
    }


    public findUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {

        try {

            logger.info('UserController: Inicio del proceso de busqueda de usuario'); // Inicio del método

            const idUser: ObjectIdParam = req.body.idUser;

            logger.info('UserController: Datos enviados por el usuario', idUser);

            // 1. Llama al servicio de crear usuario
            logger.info('UserController: Llamando al servicio UserService.findUser.');
            const result = await this.userService.findUser(idUser);

            logger.info(`UserController: Usuario encontrado de forma exitosa.`);
            logger.debug({ message: 'UserController: Preparando respuesta de éxito: ', data: result });
            sendSuccessResponse(res, 200, result, "Usuario encontrado exitosamente");

            
        } catch (error) {
            
            // Log de error en el catch
            logger.error({ message: 'DataUserController: Error durante la busqueda del usuario', error });
            // Si el código es incorrecto, el servicio lanzará una excepción que será manejada aquí.
            next(error);
        }
    }

    public findUserByUsername = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {

        try {

            logger.info('UserController: Inicio del proceso de busqueda de usuario por username'); // Inicio del método

            const username: string = req.body.username;

            logger.info('UserController: Datos enviados por el usuario', username);

            // 1. Llama al servicio de crear usuario
            logger.info('UserController: Llamando al servicio UserService.findUserByUsername.');
            const result = await this.userService.findUserByUsername(username);

            logger.info(`UserController: Usuario encontrado de forma exitosa.`);
            logger.debug({ message: 'UserController: Preparando respuesta de éxito: ', data: result });
            sendSuccessResponse(res, 200, result, "Usuario encontrado exitosamente");

            
        } catch (error) {
            
            // Log de error en el catch
            logger.error({ message: 'DataUserController: Error durante la busqueda del usuario', error });
            // Si el código es incorrecto, el servicio lanzará una excepción que será manejada aquí.
            next(error);
        }
    }
}
