import { Model } from "mongoose";
import { inject, injectable } from "tsyringe";
import { UserDocument } from "../models/user.model";

@injectable()
export class UserValidator {

    constructor(
        @inject("UserModel") private readonly userModel: Model<UserDocument>,
    ) { }
}