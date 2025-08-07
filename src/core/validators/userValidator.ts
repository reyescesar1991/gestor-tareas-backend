import { ClientSession, Model } from "mongoose";
import { inject, injectable } from "tsyringe";
import { UserDocument } from "../models/user.model";
import { IUserRepository } from "../../services/user/interfaces/IUser.repository";
import { Transactional } from "../utils/transactional-wrapper";
import { UserAlreadyExistError, UserNotFoundError, UserPasswordNotMisMatchError, UsersNotFoundError, UserUniqueFieldsAlreadyExistError } from "../exceptions";
import { TransactionManager } from "../database/transactionManager";

@injectable()
export class UserValidator {

    constructor(
        @inject("TransactionManager") private readonly transactionManager: TransactionManager,
        @inject("IUserRepository") private readonly userRepository : IUserRepository,
    ) { }

    validateUserExists(user : UserDocument) : void{

        if(!user) throw new UserNotFoundError();

    }

    validateUsersExists(users : UserDocument[]) : void{

        if(users.length < 1) throw new UsersNotFoundError();

    }

    validatePasswordMatch(dbPassword : string, password : string) : void {

        if(dbPassword !== password) throw new UserPasswordNotMisMatchError();
    }

    @Transactional()
    async validateUserUniqueness(username: string, session?: ClientSession): Promise<void> {

        console.log(username);
        

        const userExists = await this.userRepository.findUserByUsername(username, session);
        

        if (userExists) throw new UserAlreadyExistError();

    }

    @Transactional()
    async validateUserExistsUniqueFields(email: string, phone: string,  session?: ClientSession): Promise<void> {

        const userExists = await this.userRepository.findUserByUniqueFields(phone, email, session);

        if (userExists) throw new UserUniqueFieldsAlreadyExistError();

    }
}