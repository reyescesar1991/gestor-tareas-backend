import { LoginAuthDto } from "../../../core/zodValidators/auth.zod-validator";
import { ObjectIdParam } from "../../../core/zodValidators/idMongo.validator";
import { IAuthRepository } from "../interfaces/IAuth.repository";

export class AuthRepositoryImpl implements IAuthRepository{

    constructor(){}

    loginUser(loginData: LoginAuthDto): Promise<void> {
        throw new Error("Method not implemented.");
    }
    logoutUser(idUser: ObjectIdParam): Promise<void> {
        throw new Error("Method not implemented.");
    }

    
}