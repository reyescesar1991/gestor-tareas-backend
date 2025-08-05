import { inject, injectable } from "tsyringe";
import { ITaskRepository } from "../interfaces/ITask.repository";
import { ClientSession, Model } from "mongoose";
import { TaskDocument } from "../../../core/models/task.model";
import { TaskDto } from "../../../core/zodValidators";
import { ObjectIdParam } from "../../../core/zodValidators/idMongo.validator";
import { TaskUpdateDto } from "../../../core/zodValidators/task.zod-validator";

@injectable()
export class TaskRepositoryImpl implements ITaskRepository{

    constructor(
        @inject("TaskModel") private readonly TaskModel: Model<TaskDocument>,
    ){}

    async updateTask(idTask : ObjectIdParam, dataUpdateTask: TaskUpdateDto, session?: ClientSession): Promise<TaskDocument | null> {
        
        return await this.TaskModel.findByIdAndUpdate(idTask, dataUpdateTask, {new : true, runValidators : true, session});
    }

    async findTaskById(idTask: ObjectIdParam, session?: ClientSession): Promise<TaskDocument | null> {
        
        return await this.TaskModel.findById(idTask, null, {session});
    }

    async createTask(dataCreateTask: TaskDto, session?: ClientSession): Promise<TaskDocument | null> {
        
        const [newTask] = await this.TaskModel.create([dataCreateTask], {session});
        return newTask;
    }

    async findTasks(): Promise<TaskDocument[] | null> {
        
        return await this.TaskModel.find();
    }

}