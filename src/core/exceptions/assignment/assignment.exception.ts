import { AppError } from "../../types/errors";

export class AssignmentNotFoundError extends AppError {
    public readonly code: number = 1300; // Código HTTP para no autorizado
    constructor(message: string = "La asignacion no existe") { // El código HTTP para "No encontrado" es 404
        super(message, 404);
        this.name = "AssignmentNotFoundError";
    }
}

export class AssignmentAlreadyAssignedError extends AppError {
    public readonly code: number = 1301; // Código HTTP para no autorizado
    constructor(message: string = "La tarea ya se encuentra asignada a otro usuario") { // El código HTTP para "No encontrado" es 404
        super(message, 404);
        this.name = "AssignmentAlreadyAssignedError";
    }
}

export class AssignmentsNotFoundError extends AppError {
    public readonly code: number = 1302; // Código HTTP para no autorizado
    constructor(message: string = "No se encontraron asignaciones") { // El código HTTP para "No encontrado" es 404
        super(message, 404);
        this.name = "AssignmentsNotFoundError";
    }
}
