import { delay, inject, injectable } from "tsyringe";
import { handleError } from "../../core/utils/handleErrors";
import { LoginAuthDto } from "../../core/zodValidators/auth.zod-validator";
import { UserService } from "../user/User.service";
import { UserValidator } from "../../core/validators";
import { TokenService } from "./services/token.service";

@injectable()
export class AuthService {

    constructor(
        @inject(UserService) private readonly userService: UserService,
        @inject(delay(() => TokenService)) private readonly tokenService: TokenService,
        @inject(UserValidator) private readonly userValidator: UserValidator,
    ){}

    async loginUser(login : LoginAuthDto) : Promise<{ token: string }>{

        try {

            const user = await this.userService.findUserByUsername(login.username);

            this.userValidator.validatePasswordMatch(user.password, login.password);

            // Corregido: Usar el _id del usuario de la BD, no el username del login.
            const token = this.tokenService.generateToken(
                {
                    userId : user._id.toString(),
                    jti : ""
                }
            );

            return {token};
            
        } catch (error) {
            // Corregido: Relanzar el error para que el controlador lo capture.
            throw handleError(error);
        }
    }
}