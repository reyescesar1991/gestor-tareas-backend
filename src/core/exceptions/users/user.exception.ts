import { AppError } from "../../types/errors";

export class UserNotFoundError extends AppError {
    public readonly code: number = 1100; // Código HTTP para no autorizado
    constructor(message: string = "El usuario no existe") { // El código HTTP para "No encontrado" es 404
        super(message, 404);
        this.name = "UserNotFoundError";
    }
}

export class UserAlreadyExistError extends AppError {
    public readonly code: number = 1101; // El código HTTP para "Conflicto" es 409
    constructor(message: string = "El usuario ya existe") { // Un recurso que ya existe es un conflicto
        super(message, 409);
        this.name = "UserAlreadyExistError";
    }
}

export class UserUniqueFieldsAlreadyExistError extends AppError {
    public readonly code: number = 1102; // El código HTTP para "Conflicto" es 409
    constructor(message: string = "El correo y el numero de telefono ya se encuentran registrados, intente con unos distintos") { // También es un conflicto
        super(message, 409);
        this.name = "UserUniqueFieldsAlreadyExistError";
    }
}

export class UserPasswordNotMisMatchError extends AppError {
    public readonly code: number = 1103; // El código HTTP para "No autorizado" o "Credenciales inválidas" es 401
    constructor(message: string = "Los datos no coinciden") { // Contraseña incorrecta es un fallo de autenticación
        super(message, 401);
        this.name = "UserPasswordNotMisMatchError";
    }
}

export class UsersNotFoundError extends AppError {
    public readonly code: number = 1104; // Código HTTP para no autorizado
    constructor(message: string = "No se encontraron usuarios") { // El código HTTP para "No encontrado" es 404
        super(message, 404);
        this.name = "UsersNotFoundError";
    }
}