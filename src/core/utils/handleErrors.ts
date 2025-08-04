import { ZodError } from "zod";
import { AppError, UnexpectedError } from "../types/errors";

export const handleError = (error: unknown): AppError | ZodError => {
    // Si el error ya es un ZodError, no lo modificamos.
    if (error instanceof ZodError) {
        return error;
    }
    
    // Si el error ya es un AppError (o una de sus subclases), no lo modificamos.
    if (error instanceof AppError) {
        return error;
    }

    // Si el error es un objeto Error nativo o de una librería de terceros,
    // lo envolvemos en un UnexpectedError para mantener la consistencia.
    if (error instanceof Error) {
        return new UnexpectedError(error);
    }
    
    // Si el error no es un objeto Error (ej. un string o número),
    // lo convertimos en un UnexpectedError con un mensaje genérico.
    return new UnexpectedError(new Error(String(error)));
};