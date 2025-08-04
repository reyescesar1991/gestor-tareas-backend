
export abstract class AppError extends Error {
    // Código de error interno de la aplicación (ej. 1001, 1002)
    abstract code: number;
    // Código de estado HTTP por defecto
    public readonly httpStatusCode: number;
    public readonly details?: any;

    constructor(message: string, httpStatusCode: number = 500, details?: any) {
        super(message);
        this.name = this.constructor.name;
        this.httpStatusCode = httpStatusCode;
        this.details = details;
        Object.setPrototypeOf(this, AppError.prototype);
    }
}

// Define un error de acceso no autorizado
export class UnauthorizedError extends AppError {
    public readonly code: number = 401; // Código HTTP para no autorizado
    constructor(message: string = "Acceso no autorizado.") {
        super(message, 401);
        this.name = "UnauthorizedError";
    }
}

// Define un error de acceso prohibido
export class ForbiddenError extends AppError {
    public readonly code: number = 403; // Código HTTP para prohibido
    constructor(message: string = "Acceso denegado. No tiene permisos para esta acción.") {
        super(message, 403);
        this.name = "ForbiddenError";
    }
}

// Define un error inesperado
export class UnexpectedError extends AppError {
    public readonly code: number = 500;
    public readonly originalError?: Error;

    constructor(error: Error, message?: string) {
        const defaultMessage = `Ha ocurrido un error inesperado: ${error.message || 'Error desconocido'}. Intente nuevamente.`;
        super(message || defaultMessage, 500); // Se asume que AppError ahora acepta un httpStatusCode
        this.name = "UnexpectedError";
        this.originalError = error; // Guardamos el error original para depuración
    }
}