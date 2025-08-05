import { container } from "tsyringe";
import { TransactionManager } from "../../database/transactionManager";
import { IAuthRepository } from "../../../services/auth/interfaces/IAuth.repository";
import { AuthRepositoryImpl } from "../../../services/auth/repositories/auth.repository";
import { AuthService } from "../../../services/auth/Auth.service";

export const AuthDependencies = async () => {

    container.register("TransactionManager", TransactionManager);

    container.register<IAuthRepository>("IAuthRepository", {useClass : AuthRepositoryImpl});

    container.register("AuthService", {useClass : AuthService});
}