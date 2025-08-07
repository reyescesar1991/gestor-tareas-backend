import { ClientSession } from "mongoose";
import { UserDto } from "../../../core/zodValidators";
import { UserDocument } from "../../../core/models/user.model";
import { ObjectIdParam } from "../../../core/zodValidators/idMongo.validator";

export interface IUserRepository{

    createUser(dataCreateUser : UserDto, session ?: ClientSession) : Promise<UserDocument | null>;
    findUser(idUser : ObjectIdParam, session ?: ClientSession) : Promise<UserDocument | null>;
    findUserByUsername(username : string, session ?: ClientSession) : Promise<UserDocument | null>;
    getUsers(session ?: ClientSession) : Promise<UserDocument[] | null>;
    findUserByUniqueFields(phone : string, email : string, session ?: ClientSession): Promise<UserDocument | null>
}