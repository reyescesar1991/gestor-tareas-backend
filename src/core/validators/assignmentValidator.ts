import { Model } from "mongoose";
import { inject, injectable } from "tsyringe";
import { AssignmentDocument } from "../models/assignment.model";
import { AssignmentNotFoundError } from "../exceptions";

@injectable()
export class AssignmentValidator{

    constructor(
        @inject("AssignmentModel") private readonly AssignmentModel: Model<AssignmentDocument>,
    ){}

    validateAssignmentExists(assignment : AssignmentDocument) : void{

        if(!assignment) throw new AssignmentNotFoundError("La asignacion no existe");

    }

}