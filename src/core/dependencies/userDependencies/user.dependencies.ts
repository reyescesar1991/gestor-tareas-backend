import { container } from "tsyringe"
import { UserModel } from "../../models"
import { TransactionManager } from "../../database/transactionManager";
import { UserValidator } from "../../validators";
import { UserRepositoryImpl } from "../../../services/user/repositories/user.repository";
import { IUserRepository } from "../../../services/user/interfaces/IUser.repository";
import { UserService } from "../../../services/user/User.service";


export const UserDependencies = async () => {

    container.register("TransactionManager", TransactionManager);
    container.register("UserModel", {useValue : UserModel});

    container.register("UserValidator", {useValue : UserValidator});

    container.register<IUserRepository>("IUserRepository", {useClass : UserRepositoryImpl});

    container.register("UserService", {useClass : UserService});
}