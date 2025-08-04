import { container } from "tsyringe";
import { TransactionManager } from "../../database/transactionManager";
import { TaskModel } from "../../models";
import { TaskValidator } from "../../validators";
import { ITaskRepository } from "../../../services/task/interfaces/ITask.repository";
import { TaskRepositoryImpl } from "../../../services/task/repositories/task.repository";

export const TaskDependencies = async () => {

    container.register("TransactionManager", TransactionManager);
    container.register("TaskModel", {useValue : TaskModel});

    container.register("TaskValidator", {useValue : TaskValidator});

    container.register<ITaskRepository>("ITaskRepository", {useClass : TaskRepositoryImpl});
}