import { logger } from "../../../core/logger/logger";
import { handleMiddlewareError } from "../../../core/utils/middlewareErrorHandler";
import { taskUpdateZodSchema } from "../../../core/zodValidators/task.zod-validator";
import { Request, Response, NextFunction } from 'express';

export const validateUpdateTaskData = (req: Request, res: Response, next: NextFunction) => {
    logger.info('--- MIDDLEWARE: Ejecutando validateUpdateTaskData ---');
    logger.debug({ message: 'Request Body Recibido:', body: req.body.dataUpdateTask });

    // --- PUNTO DE CONTROL #1: Verificar que el schema no sea undefined ---
    // Esto nos dirá inmediatamente si hay un problema con la importación.
    if (!taskUpdateZodSchema) {
        const importError = new Error('FATAL: El schema de validación (taskUpdateZodSchema) es undefined. Revisa la importación.');
        logger.error(importError.message);
        // Pasamos el error al manejador global para que nos dé un 500 y sepamos que algo está muy mal.
        return next(importError);
    }

    try {
        // --- PUNTO DE CONTROL #2: Intentar la validación ---
        taskUpdateZodSchema.parse(req.body);

        // Si el código llega aquí, la validación fue exitosa.
        logger.info('Validación de Zod para la actualizacion de tarea SUPERADA. Pasando al controlador.');
        next();
    } catch (error) {

        handleMiddlewareError(error, res, next, 'Datos de actualizacion de tarea inválidos');
    }
};