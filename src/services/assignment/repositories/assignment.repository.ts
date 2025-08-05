import { inject, injectable } from "tsyringe";
import { IAssignmentRepository } from "../interfaces/IAssignment.repository";
import { ClientSession, Model } from "mongoose";
import { AssignmentDocument } from "../../../core/models/assignment.model";
import { AssignmentDto } from "../../../core/zodValidators";
import { ObjectIdParam } from "../../../core/zodValidators/idMongo.validator";

@injectable()
export class AssignmentRepositoryImpl implements IAssignmentRepository{

    constructor(
        @inject("AssignmentModel") private readonly AssignmentModel: Model<AssignmentDocument>,
    ){}
    
    async findAssignmentByUserId(idUser: ObjectIdParam, session?: ClientSession): Promise<AssignmentDocument | null> {
        
        // Corregido: El campo no es 'idUser', y la sesión va en las opciones.
        // Buscamos si el usuario ha asignado o le han asignado una tarea.
        return await this.AssignmentModel.findOne({ 
            $or: [{ assignedBy: idUser }, { assignedTo: idUser }] 
        }, null, {session});
    }

    async createAssignment(dataCreateAssignment: AssignmentDto, session?: ClientSession): Promise<AssignmentDocument | null> {
        
        const [newAssignment] = await this.AssignmentModel.create([dataCreateAssignment], {session});
        return newAssignment;
    }
    async findAssignmentById(idAssignment: ObjectIdParam, session?: ClientSession): Promise<AssignmentDocument | null> {
        
        return await this.AssignmentModel.findById(idAssignment, null, {session});
    }
}