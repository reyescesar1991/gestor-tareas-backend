import { ClientSession } from "mongoose";
import { TaskDocument } from "../../../core/models/task.model";
import { TaskDto } from "../../../core/zodValidators";
import { ObjectIdParam } from "../../../core/zodValidators/idMongo.validator";
import { TaskUpdateDto } from "../../../core/zodValidators/task.zod-validator";

export interface ITaskRepository{

    createTask(dataCreateTask : TaskDto, session ?: ClientSession) : Promise<TaskDocument | null>;
    updateTask(idTask : ObjectIdParam, dataUpdateTask : TaskUpdateDto, session ?: ClientSession) : Promise<TaskDocument | null>;
    findTasks() : Promise<TaskDocument[] | null>;
    findTaskById(idTask : ObjectIdParam, session ?: ClientSession) : Promise<TaskDocument | null>;
}