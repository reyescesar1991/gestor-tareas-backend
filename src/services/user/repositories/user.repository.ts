import { ClientSession, Model } from "mongoose";
import { UserDocument } from "../../../core/models/user.model";
import { UserDto } from "../../../core/zodValidators";
import { ObjectIdParam } from "../../../core/zodValidators/idMongo.validator";
import { IUserRepository } from "../interfaces/IUser.repository";
import { inject, injectable } from "tsyringe";

@injectable()
export class UserRepositoryImpl implements IUserRepository{

    constructor(
        @inject("UserModel") private readonly userModel: Model<UserDocument>,
    ){}

    async createUser(dataCreateUser: UserDto, session?: ClientSession): Promise<UserDocument | null> {
        
        const [newUser] = await this.userModel.create([dataCreateUser], {session});
        return newUser;
    }

    async findUser(idUser: ObjectIdParam, session?: ClientSession): Promise<UserDocument | null> {
        
        return await this.userModel.findById(idUser, {session});
    }
    
}