import { inject, injectable } from "tsyringe";
import { ITaskRepository } from "../interfaces/ITask.repository";
import { ClientSession, Model } from "mongoose";
import { TaskDocument } from "../../../core/models/task.model";
import { TaskDto } from "../../../core/zodValidators";

@injectable()
export class TaskRepositoryImpl implements ITaskRepository{

    constructor(
        @inject("TaskModel") private readonly TaskModel: Model<TaskDocument>,
    ){}

    async createTask(dataCreateTask: TaskDto, session?: ClientSession): Promise<TaskDocument | null> {
        
        const [newTask] = await this.TaskModel.create([dataCreateTask], {session});
        return newTask;
    }

    async findTasks(): Promise<TaskDocument[] | null> {
        
        return await this.TaskModel.find();
    }

}