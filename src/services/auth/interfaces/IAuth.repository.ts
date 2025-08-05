import { LoginAuthDto } from "../../../core/zodValidators/auth.zod-validator";
import { ObjectIdParam } from "../../../core/zodValidators/idMongo.validator";

export interface IAuthRepository {

    loginUser(loginData : LoginAuthDto) : Promise<void>;
    logoutUser(idUser : ObjectIdParam) : Promise<void>;
}