import { ClientSession, Model } from "mongoose";
import { inject, injectable } from "tsyringe";
import { AssignmentDocument } from "../models/assignment.model";
import { AssignmentAlreadyAssignedError, AssignmentNotFoundError, AssignmentsNotFoundError } from "../exceptions";
import { IAssignmentRepository } from "../../services/assignment/interfaces/IAssignment.repository";
import { ObjectIdParam } from "../zodValidators/idMongo.validator";

@injectable()
export class AssignmentValidator{

    constructor(
        @inject("IAssignmentRepository") private readonly assignmentRepository : IAssignmentRepository,
    ){}

    validateAssignmentExists(assignment : AssignmentDocument) : void{

        if(!assignment) throw new AssignmentNotFoundError("La asignacion no existe");

    }

    validateAssignmentsExists(assignment : AssignmentDocument[]) : void{

        if(assignment.length < 1) throw new AssignmentsNotFoundError("No se encontraron asignaciones");

    }

    async validateAssignmentIsAlreadyAssigned(taskId : ObjectIdParam, session ?: ClientSession) : Promise<void>{

        const task = await this.assignmentRepository.findAssignmentByTaskId(taskId, session);

        if(task) throw new AssignmentAlreadyAssignedError("La tarea ya tiene una asignacion");
    }

}