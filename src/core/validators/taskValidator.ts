import { inject, injectable } from "tsyringe";
import { TaskDocument } from "../models/task.model";
import { Model } from "mongoose";
import { TaskNotFoundError } from "../exceptions";

@injectable()
export class TaskValidator{

    constructor(
        @inject("TaskModel") private readonly TaskModel: Model<TaskDocument>,
    ){}

    static validateTaskExists(task : TaskDocument) : void{

        if(!task) throw new TaskNotFoundError("La tarea no existe");

    }

}