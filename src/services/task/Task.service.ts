import { inject } from "tsyringe";
import { Transactional } from "../../core/utils/transactional-wrapper";
import { ITaskRepository } from "./interfaces/ITask.repository";
import { ClientSession } from "mongoose";
import { TransactionManager } from "../../core/database/transactionManager";
import { TaskDocument } from "../../core/models/task.model";
import { TaskValidator } from "../../core/validators";
import { TaskDto } from "../../core/zodValidators";

export class TaskService {

    constructor(
        @inject("ITaskRepository") private readonly taskRepository: ITaskRepository,
        @inject("TransactionManager") private readonly transactionManager: TransactionManager,
        @inject("TaskValidator") private readonly taskValidator: TaskValidator,
    ) { }

    @Transactional()
    async createTask(dataCreateTask: TaskDto, session?: ClientSession): Promise<TaskDocument | null> {
        
        
    }

    @Transactional()
    async findTasks(): Promise<TaskDocument[] | null> {
        
        
    }
}