import { logger } from "../../../core/logger/logger";
import { Request, Response, NextFunction } from 'express';
import { loginAuthZodSchema } from "../../../core/zodValidators/auth.zod-validator";
import { handleMiddlewareError } from "../../../core/utils/middlewareErrorHandler";

export const validateLoginData = (req: Request, res: Response, next: NextFunction) => {
    logger.info('--- MIDDLEWARE: Ejecutando validateLoginData ---');
    logger.debug({ message: 'Request Body Recibido:', body: req.body });

    // --- PUNTO DE CONTROL #1: Verificar que el schema no sea undefined ---
    // Esto nos dirá inmediatamente si hay un problema con la importación.
    if (!loginAuthZodSchema) {
        const importError = new Error('FATAL: El schema de validación (loginAuthZodSchema) es undefined. Revisa la importación.');
        logger.error(importError.message);
        // Pasamos el error al manejador global para que nos dé un 500 y sepamos que algo está muy mal.
        return next(importError);
    }

    try {
        // --- PUNTO DE CONTROL #2: Intentar la validación ---
        loginAuthZodSchema.parse(req.body);

        // Si el código llega aquí, la validación fue exitosa.
        logger.info('Validación de Zod para login SUPERADA. Pasando al controlador.');
        next();
    } catch (error) {
        // // --- PUNTO DE CONTROL #3: La validación falló. Capturamos el error. ---
        // logger.warn('La validación de Zod FALLÓ. Entrando al bloque CATCH.');

        // if (error instanceof ZodError) {
        //     // ¡Éxito! Es el error de validación que esperábamos.
        //     logger.warn('El error es de tipo ZodError. Se manejará y devolverá un 400.');
        //     return handleZodError(error, res, next, 'Datos de login inválidos');
        // }
        // // Si el error NO es de Zod, es un error inesperado (como el TypeError).
        // logger.error({ message: 'Error inesperado durante la validación, NO es un ZodError. Pasando al manejador global.', error });
        // next(error);
        handleMiddlewareError(error, res, next, 'Datos de login inválidos');
    }
};