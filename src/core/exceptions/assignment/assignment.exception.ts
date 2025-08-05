import { AppError } from "../../types/errors";

export class AssignmentNotFoundError extends AppError {
    public readonly code: number = 1300; // Código HTTP para no autorizado
    constructor(message: string = "La asignacion no existe") { // El código HTTP para "No encontrado" es 404
        super(message, 404);
        this.name = "AssignmentNotFoundError";
    }
}