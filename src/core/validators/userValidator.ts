import { ClientSession, Model } from "mongoose";
import { inject, injectable } from "tsyringe";
import { UserDocument } from "../models/user.model";
import { IUserRepository } from "../../services/user/interfaces/IUser.repository";
import { Transactional } from "../utils/transactional-wrapper";
import { UserAlreadyExistError, UserNotFoundError, UserPasswordNotMisMatchError, UserUniqueFieldsAlreadyExistError } from "../exceptions";

@injectable()
export class UserValidator {

    constructor(
        @inject("IUserRepository") private readonly userRepository : IUserRepository,
    ) { }

    static validateUserExists(user : UserDocument) : void{

        if(!user) throw new UserNotFoundError();

    }

    static validatePasswordMatch(dbPassword : string, password : string) : void {

        if(dbPassword !== password) throw new UserPasswordNotMisMatchError();
    }

    @Transactional()
    async validateUserUniqueness(username: string, session?: ClientSession): Promise<void> {

        const userExists = await this.userRepository.findUserByUsername(username, session);

        if (userExists) throw new UserAlreadyExistError();

    }

    @Transactional()
    async validateUserExistsUniqueFields(email: string, phone: string,  session?: ClientSession): Promise<void> {

        const userExists = await this.userRepository.findUserByUniqueFields(phone, email, session);

        if (userExists) throw new UserUniqueFieldsAlreadyExistError();

    }
}