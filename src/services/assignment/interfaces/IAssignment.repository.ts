import { ClientSession } from "mongoose";
import { AssignmentDto } from "../../../core/zodValidators";
import { AssignmentDocument } from "../../../core/models/assignment.model";
import { ObjectIdParam } from "../../../core/zodValidators/idMongo.validator";

export interface IAssignmentRepository{

    createAssignment(dataCreateAssignment : AssignmentDto, session ?: ClientSession) : Promise<AssignmentDocument | null>;
    findAssignments() : Promise<AssignmentDocument[] | null>;
    findAssignmentById(idAssignment : ObjectIdParam, session ?: ClientSession) : Promise<AssignmentDocument | null>;
    findAssignmentByTaskId(idTask : ObjectIdParam, session ?: ClientSession) : Promise<AssignmentDocument | null>;
    findAssignmentByUserId(idUser : ObjectIdParam, session ?: ClientSession) : Promise<AssignmentDocument | null>;
}