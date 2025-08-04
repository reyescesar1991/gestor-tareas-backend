import { inject, injectable } from "tsyringe";
import { TaskDocument } from "../models/task.model";
import { Model } from "mongoose";

@injectable()
export class TaskValidator{

    constructor(
        @inject("TaskModel") private readonly TaskModel: Model<TaskDocument>,
    ){}
}