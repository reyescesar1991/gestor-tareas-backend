import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { logger } from '../../core/logger/logger';
import { AppError, UnexpectedError } from '../../core/types/errors';

interface ErrorResponse {
    message: string;
    code?: number;
    details?: any;
    stack?: string;
}

export const errorHandler = (
    err: Error, // Gracias a `handleError`, este `err` siempre será AppError o ZodError
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let statusCode = 500;
    let message = 'Algo salió mal en el servidor.';
    let internalAppCode: number | undefined;
    let details: any = undefined;

    logger.error('GLOBAL ERROR HANDLER: Error capturado:', {
        name: err.name,
        message: err.message,
        stack: err.stack
    });

    if (err instanceof ZodError) {
        statusCode = 400; // Bad Request
        message = 'Error de validación de entrada.';
        details = err.issues.map(e => ({
            path: e.path.join('.'),
            message: e.message
        }));
    } else if (err instanceof AppError) {
        // Como todos los errores personalizados heredan de AppError, podemos
        // manejar sus propiedades directamente.
        statusCode = err.httpStatusCode;
        message = err.message;
        internalAppCode = err.code;
        
        // Manejo especial para errores inesperados para mostrar detalles del error original
        if (err instanceof UnexpectedError) {
             if (process.env.NODE_ENV === 'development' && err.originalError) {
                details = {
                    originalErrorName: err.originalError.name,
                    originalErrorMessage: err.originalError.message
                };
             }
        }
    }
    // El bloque `else` ya no es necesario porque `handleError` se asegura de que
    // todos los errores sean una instancia de `AppError` o `ZodError`.

    const errorResponse: ErrorResponse = {
        message: message,
        code: internalAppCode,
        details: details,
    };

    if (process.env.NODE_ENV === 'development') {
        errorResponse.stack = err.stack;
    }

    res.status(statusCode).json(errorResponse);
};