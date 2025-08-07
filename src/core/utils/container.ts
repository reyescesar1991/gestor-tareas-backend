import "reflect-metadata";
import { container } from "tsyringe";
import * as dotenv from 'dotenv';
import { JWT_PREAUTH_SECRET, JWT_SECRET_TOKEN } from "../const/jwt.const";

/**
 * Configura el contenedor de inyección de dependencias (DI) de tsyringe.
 * Esta función debe ser llamada una sola vez al inicio de la aplicación.
 */
export function setupContainer(): void {
    // Cargar variables de entorno desde el archivo .env.
    // Usamos un path relativo desde la raíz del proyecto, que es más robusto.
    const result = dotenv.config();

    // Si dotenv.config() falla, es porque no encontró el .env en la raíz.
    if (result.error) {
        console.error("❌ Error al cargar el archivo .env. Asegúrate de que exista en la raíz del proyecto.");
        throw result.error;
    }

    // --- Validar y registrar valores primitivos (secrets) ---
    // Verificamos cada variable de entorno requerida de forma individual para obtener errores más claros.
    if (!process.env.JWT_SECRET) {
        throw new Error("FATAL ERROR: La variable de entorno 'JWT_SECRET_TOKEN' no está definida en el archivo .env.");
    }
    if (!process.env.JWT_PREAUTH_SECRET) {
        throw new Error("FATAL ERROR: La variable de entorno 'JWT_PREAUTH_SECRET' no está definida en el archivo .env.");
    }

    // Registra el valor de la variable de entorno para el token de inyección correspondiente.
    container.register(JWT_SECRET_TOKEN, { useValue: process.env.JWT_SECRET_TOKEN });
    container.register(JWT_PREAUTH_SECRET, { useValue: process.env.JWT_PREAUTH_SECRET });

    // Aquí puedes registrar otras dependencias en el futuro.
}
