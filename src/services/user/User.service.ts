import { ClientSession } from "mongoose";
import { inject, injectable } from "tsyringe";
import { TransactionManager } from "../../core/database/transactionManager";
import { UserDocument } from "../../core/models/user.model";
import { UserValidator } from "../../core/validators";
import { UserDto } from "../../core/zodValidators";
import { ObjectIdParam } from "../../core/zodValidators/idMongo.validator";
import { IUserRepository } from "./interfaces/IUser.repository";
import { Transactional } from "../../core/utils/transactional-wrapper";
import { handleError } from "../../core/utils/handleErrors";
import { logger } from "../../core/logger/logger";

@injectable()
export class UserService {

    constructor(
        @inject("IUserRepository") private readonly userRepository: IUserRepository,
        @inject("TransactionManager") private readonly transactionManager: TransactionManager,
        @inject("UserValidator") private readonly userValidator: UserValidator,
    ) { }

    @Transactional()
    async createUser(dataCreateUser: UserDto, session?: ClientSession): Promise<UserDocument | null> {

        try {

            logger.debug("--Data para la creacion de usuario: ", dataCreateUser);
            logger.info("----Iniciando creacion de usuario en el service: UserService----");

            await this.userValidator.validateUserUniqueness(dataCreateUser.username, session);

            logger.info("----Se ha validado que el usuario no exista previamente----");

            await this.userValidator.validateUserExistsUniqueFields(dataCreateUser.email, dataCreateUser.phone, session);

            logger.info("----Se ha validado que el usuario no use campos unicos que posea otro usuario----");
            logger.info("----Operacion existosa: Se ha creado el usuario con exito----");   

            return await this.userRepository.createUser(dataCreateUser, session);
            
        } catch (error) {
            
            logger.error("Ha ocurrido un error en el service createUser: UserService: ", error);
            throw handleError(error);
        }
    }

    @Transactional()
    async findUser(idUser: ObjectIdParam, session?: ClientSession): Promise<UserDocument | null> {

        try {

            logger.debug("--Data para la busqueda de un usuario: ", idUser);
            logger.info("----Iniciando la busqueda del usuario en el service: UserService----");

            const user = await this.userRepository.findUser(idUser, session);

            logger.info("----Se ha encontrado el usuario----");

            UserValidator.validateUserExists(user);

            logger.info("----Operacion existosa: Se ha encontrado el usuario con exito----")

            return user;
            
        } catch (error) {
            
            logger.error("Ha ocurrido un error en el service findUser: UserService: ", error);
            throw handleError(error);
        }
    }

    @Transactional()
    async findUserByUsername(username: string, session?: ClientSession): Promise<UserDocument | null> {

        try {

            logger.debug("--Data para la busqueda de un usuario: ", username);
            logger.info("----Iniciando la busqueda del usuario en el service: UserService----");

            const user = await this.userRepository.findUserByUsername(username, session);

            logger.info("----Se ha encontrado el usuario----");

            UserValidator.validateUserExists(user);

            logger.info("----Operacion existosa: Se ha encontrado el usuario con exito----")

            return user;
            
        } catch (error) {
            
            logger.error("Ha ocurrido un error en el service findUser: UserService: ", error);
            throw handleError(error);
        }
    }
}