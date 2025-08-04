import { inject } from "tsyringe";
import { Transactional } from "../../core/utils/transactional-wrapper";
import { ClientSession } from "mongoose";
import { TransactionManager } from "../../core/database/transactionManager";
import { AssignmentDocument } from "../../core/models/assignment.model";
import { AssignmentValidator } from "../../core/validators";
import { AssignmentDto } from "../../core/zodValidators";
import { IAssignmentRepository } from "./interfaces/IAssignment.repository";
import { ObjectIdParam } from "../../core/zodValidators/idMongo.validator";


export class AssignmentService{

    constructor(
        @inject("AssignmentRepository") private readonly assignmentRepository: IAssignmentRepository,
        @inject("TransactionManager") private readonly transactionManager: TransactionManager,
        @inject("AssignmentValidator") private readonly assignmentValidator: AssignmentValidator,
    ){}

    @Transactional()
    async createAssignment(dataCreateAssignment : AssignmentDto, session ?: ClientSession) : Promise<AssignmentDocument | null>{

        
    }

    @Transactional()
    async findAssignmentByUserId(idUser: ObjectIdParam, session?: ClientSession): Promise<AssignmentDocument | null>{
        
    }

    @Transactional()
    async findAssignmentById(idAssignment: ObjectIdParam, session?: ClientSession): Promise<AssignmentDocument | null>{
        
    }
}