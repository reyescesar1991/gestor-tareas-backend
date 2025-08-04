import { ClientSession } from "mongoose";
import { TaskDocument } from "../../../core/models/task.model";
import { TaskDto } from "../../../core/zodValidators";

export interface ITaskRepository{

    createTask(dataCreateTask : TaskDto, session ?: ClientSession) : Promise<TaskDocument | null>;
    findTasks() : Promise<TaskDocument[] | null>;
}