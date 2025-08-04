import { Model } from "mongoose";
import { inject, injectable } from "tsyringe";
import { AssignmentDocument } from "../models/assignment.model";

@injectable()
export class AssignmentValidator{

    constructor(
        @inject("AssignmentModel") private readonly AssignmentModel: Model<AssignmentDocument>,
    ){}
}