import { ClientSession } from "mongoose";
import { inject } from "tsyringe";
import { TransactionManager } from "../../core/database/transactionManager";
import { UserDocument } from "../../core/models/user.model";
import { UserValidator } from "../../core/validators";
import { UserDto } from "../../core/zodValidators";
import { ObjectIdParam } from "../../core/zodValidators/idMongo.validator";
import { IUserRepository } from "./interfaces/IUser.repository";
import { Transactional } from "../../core/utils/transactional-wrapper";


export class UserService {

    constructor(
        @inject("IUserRepository") private readonly userRepository: IUserRepository,
        @inject("TransactionManager") private readonly transactionManager: TransactionManager,
        @inject("UserValidator") private readonly userValidator: UserValidator,
    ) { }

    @Transactional()
    async createUser(dataCreateUser: UserDto, session?: ClientSession): Promise<UserDocument | null> {

        
    }

    @Transactional()
    async findUser(idUser: ObjectIdParam, session?: ClientSession): Promise<UserDocument | null> {

        
    }
}