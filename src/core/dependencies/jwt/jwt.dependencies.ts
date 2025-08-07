import { container } from "tsyringe";
import { JWT_PREAUTH_SECRET, JWT_SECRET_TOKEN } from "../../const/jwt.const";
import { TokenService } from "../../../services/auth/services/token.service";

export const configureJwtDependencies = async () => {

    // La carga de variables de entorno ya se realiza de forma segura en `server.ts`.
    // No es necesario ni recomendable volver a cargarla aquí.

    const jwtSecret = process.env.JWT_SECRET_TOKEN; // Usar el nombre correcto de la variable de entorno

    if (!jwtSecret) {
        throw new Error('FATAL: JWT_SECRET_TOKEN no está definido en las variables de entorno.');
    }

    container.registerInstance(JWT_SECRET_TOKEN, jwtSecret);

    const jwtPreAuthSecret = process.env.JWT_PREAUTH_SECRET;

    if (!jwtPreAuthSecret) {
        throw new Error('JWT_PREAUTH_SECRET no está definido en .env');
    }

    container.registerInstance(JWT_PREAUTH_SECRET, jwtPreAuthSecret);

    container.register("JwtService", { useClass: TokenService });
}