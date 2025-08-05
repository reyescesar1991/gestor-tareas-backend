import { AppError } from "../../types/errors";

export class TaskNotFoundError extends AppError {
    public readonly code: number = 1200; // Código HTTP para no autorizado
    constructor(message: string = "Tarea no encontrada") { // El código HTTP para "No encontrado" es 404
        super(message, 404);
        this.name = "TaskNotFoundError";
    }
}