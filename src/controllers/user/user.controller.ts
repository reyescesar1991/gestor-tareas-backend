import { delay, inject, injectable } from "tsyringe";
import { UserService } from "../../services/user/User.service";
import { Request, Response, NextFunction } from "express";
import { logger } from "../../core/logger/logger";
import { UserDto } from "../../core/zodValidators";
import { sendSuccessResponse, sendErrorResponse } from "../../core/helper/api/successResponse.helper";
import { ICreateUserResponse } from "../../core/types/responses/user/createUser.response";
import { objectIdSchema } from "../../core/zodValidators/idMongo.validator";

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

            const createUserResponse : ICreateUserResponse = {username : result.username};

            logger.info(`UserController: Usuario creado de forma exitosa.`);
            logger.debug({ message: 'UserController: Preparando respuesta de éxito: ', data: createUserResponse });
            sendSuccessResponse(res, 201, createUserResponse, "Usuario creado exitosamente");
            
        } catch (error) {
            
            // Log de error en el catch
            logger.error({ message: 'DataUserController: Error durante la creacion del usuario', error });
            // Si el código es incorrecto, el servicio lanzará una excepción que será manejada aquí.
            next(error);
        }
    }

    /**
     * Obtiene el perfil del usuario actualmente autenticado.
     * El ID del usuario se extrae de forma segura del token JWT.
     */
    public getOwnProfile = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            logger.info('UserController: Inicio del proceso de búsqueda del perfil del usuario autenticado');

            // El ID del usuario se obtiene del token JWT, que fue verificado y adjuntado por el authMiddleware.
            // ¡Esto es mucho más seguro que recibirlo del cliente!
            const userId = req.user?.userId;

            if (!userId) {
                // Esta validación es una salvaguarda. Si req.user no existe,
                // el authMiddleware ya debería haber detenido la petición.
                return sendErrorResponse(res, 401, 'No se pudo identificar al usuario desde el token.');
            }

            logger.info(`UserController: Buscando perfil para userId: ${userId}`);
            const userProfile = await this.userService.findUser(objectIdSchema.parse(userId));

            logger.info(`UserController: Perfil de usuario encontrado exitosamente.`);
            logger.debug({ message: 'UserController: Preparando respuesta de éxito: ', data: userProfile });
            sendSuccessResponse(res, 200, userProfile, "Perfil de usuario encontrado exitosamente");
        } catch (error) {
            logger.error({ message: 'UserController: Error durante la búsqueda del perfil del usuario', error });
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

    public getUsers = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {

        try {

            logger.info('UserController: Inicio del proceso de busqueda de usuarios'); // Inicio del método

            // 1. Llama al servicio de crear usuario
            logger.info('UserController: Llamando al servicio UserService.getUsers.');
            const result = await this.userService.getUsers();

            logger.info(`UserController: Usuario encontrado de forma exitosa.`);
            logger.debug({ message: 'UserController: Preparando respuesta de éxito: ', data: result });
            sendSuccessResponse(res, 200, result, "Usuarios encontrados exitosamente");

            
        } catch (error) {
            
            // Log de error en el catch
            logger.error({ message: 'DataUserController: Error durante la busqueda de los usuarios', error });
            // Si el código es incorrecto, el servicio lanzará una excepción que será manejada aquí.
            next(error);
        }
    }
}
