import { logger } from "../../../core/logger/logger";
import { Request, Response, NextFunction } from 'express';
import { assignmentZodSchama } from "../../../core/zodValidators/assignment.zod-validator";
import { handleMiddlewareError } from "../../../core/utils/middlewareErrorHandler";
import { objectIdSchema } from "../../../core/zodValidators/idMongo.validator";

export const validateCreateAssignmentData = (req: Request, res: Response, next: NextFunction) => {
    logger.info('--- MIDDLEWARE: Ejecutando validateCreateAssignmentData ---');
    logger.debug({ message: 'Request Body Recibido:', body: req.body });

    // --- PUNTO DE CONTROL #1: Verificar que el schema no sea undefined ---
    // Esto nos dirá inmediatamente si hay un problema con la importación.

    let reqClone = req.body;

    reqClone.assignedBy = objectIdSchema.parse(req.body.assignedTo);
    reqClone.assignedTo = objectIdSchema.parse(req.body.assignedTo);
    reqClone.task = objectIdSchema.parse(req.body.task);

    if (!assignmentZodSchama) {
        const importError = new Error('FATAL: El schema de validación (assignmentZodSchama) es undefined. Revisa la importación.');
        logger.error(importError.message);
        // Pasamos el error al manejador global para que nos dé un 500 y sepamos que algo está muy mal.
        return next(importError);
    }

    try {
        // --- PUNTO DE CONTROL #2: Intentar la validación ---
        assignmentZodSchama.parse(reqClone);

        // Si el código llega aquí, la validación fue exitosa.
        logger.info('Validación de Zod para la creacion de asignacion SUPERADA. Pasando al controlador.');
        next();
    } catch (error) {

        handleMiddlewareError(error, res, next, 'Datos de creacion de asignacion inválidos');
    }
};