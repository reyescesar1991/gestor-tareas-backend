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
        
        return await this.AssignmentModel.findOne({idUser}, {session});
    }

    async createAssignment(dataCreateAssignment: AssignmentDto, session?: ClientSession): Promise<AssignmentDocument | null> {
        
        const [newAssignment] = await this.AssignmentModel.create([dataCreateAssignment], {session});
        return newAssignment;
    }
    async findAssignmentById(idAssignment: ObjectIdParam, session?: ClientSession): Promise<AssignmentDocument | null> {
        
        return await this.AssignmentModel.findById(idAssignment, {session});
    }
}