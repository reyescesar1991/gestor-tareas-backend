import { logger } from "../../../core/logger/logger";
import { handleMiddlewareError } from "../../../core/utils/middlewareErrorHandler";
import { Request, Response, NextFunction } from 'express';
import { taskZodSchema } from "../../../core/zodValidators/task.zod-validator";

export const validateCreateTaskData = (req: Request, res: Response, next: NextFunction) => {
    logger.info('--- MIDDLEWARE: Ejecutando validateCreateTaskData ---');
    logger.debug({ message: 'Request Body Recibido:', body: req.body });

    // --- PUNTO DE CONTROL #1: Verificar que el schema no sea undefined ---
    // Esto nos dirá inmediatamente si hay un problema con la importación.
    if (!taskZodSchema) {
        const importError = new Error('FATAL: El schema de validación (taskZodSchema) es undefined. Revisa la importación.');
        logger.error(importError.message);
        // Pasamos el error al manejador global para que nos dé un 500 y sepamos que algo está muy mal.
        return next(importError);
    }

    try {
        // --- PUNTO DE CONTROL #2: Intentar la validación ---
        taskZodSchema.parse(req.body);

        // Si el código llega aquí, la validación fue exitosa.
        logger.info('Validación de Zod para la creacion de tarea SUPERADA. Pasando al controlador.');
        next();
    } catch (error) {

        handleMiddlewareError(error, res, next, 'Datos de creacion de tarea inválidos');
    }
};