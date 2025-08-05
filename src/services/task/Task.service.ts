import { inject } from "tsyringe";
import { Transactional } from "../../core/utils/transactional-wrapper";
import { ITaskRepository } from "./interfaces/ITask.repository";
import { ClientSession } from "mongoose";
import { TransactionManager } from "../../core/database/transactionManager";
import { TaskDocument } from "../../core/models/task.model";
import { TaskValidator } from "../../core/validators";
import { TaskDto } from "../../core/zodValidators";
import { handleError } from "../../core/utils/handleErrors";
import { ObjectIdParam } from "../../core/zodValidators/idMongo.validator";
import { TaskUpdateDto } from "../../core/zodValidators/task.zod-validator";
import { logger } from "../../core/logger/logger";
import { log } from "console";

export class TaskService {

    constructor(
        @inject("ITaskRepository") private readonly taskRepository: ITaskRepository,
        @inject("TransactionManager") private readonly transactionManager: TransactionManager,
        @inject("TaskValidator") private readonly taskValidator: TaskValidator,
    ) { }

    @Transactional()
    async createTask(dataCreateTask: TaskDto, session?: ClientSession): Promise<TaskDocument | null> {

        try {

            logger.debug("--Data para la creacion de una tarea: ", dataCreateTask);
            logger.info("----Iniciando creacion de una tarea en el service: TaskService----");

            const newTask = await this.taskRepository.createTask(dataCreateTask, session);

            logger.info("----Operacion existosa: Se ha creado la tarea con exito----");

            return newTask;

        } catch (error) {

            logger.error("Ha ocurrido un error en el service createTask: TaskService: ", error);
            throw handleError(error);
        }
    }

    @Transactional()
    async updateTask(idTask: ObjectIdParam, dataUpdateTask: TaskUpdateDto, session?: ClientSession): Promise<TaskDocument | null> {

        try {

            logger.debug("--Data para la actualizacion de una tarea: ", dataUpdateTask);
            logger.info("----Iniciando actualizacion de una tarea en el service: TaskService----");

            const task = await this.taskRepository.findTaskById(idTask, session);

            logger.debug("----Se ha encontrado la tarea para actualizar----", task);

            TaskValidator.validateTaskExists(task);

            const updateTask = await this.taskRepository.updateTask(idTask, dataUpdateTask, session);

            logger.info("----Operacion existosa: Se ha actualizado la tarea con exito----");

            return updateTask;

        } catch (error) {

            logger.error("Ha ocurrido un error en el service updateTask: TaskService: ", error);
            throw handleError(error);
        }
    }

    @Transactional()
    async findTasks(): Promise<TaskDocument[] | null> {

        try {

            logger.info("----Iniciando busqueda de las tareas en el service: TaskService----");

            const tasks = await this.taskRepository.findTasks();

            logger.debug("----Se han encontrado las tareas----", tasks);
            logger.info("----Operacion existosa: Se han encontrado las tareas con exito----");

            return tasks;

        } catch (error) {

            logger.error("Ha ocurrido un error en el service findTasks: TaskService: ", error);
            throw handleError(error);
        }
    }

    @Transactional()
    async findTaskById(idTask: ObjectIdParam, session?: ClientSession): Promise<TaskDocument | null> {

        try {

            logger.debug("--Data para la busqueda de una tarea: ", idTask);
            logger.info("----Iniciando busqueda de una tarea en el service: TaskService----");

            const task = await this.taskRepository.findTaskById(idTask, session);

            logger.debug("----Se ha encontrado la tarea----", task);

            TaskValidator.validateTaskExists(task);

            logger.info("----Operacion existosa: Se han encontrado la tarea con exito----");

            return task;

        } catch (error) {

            logger.error("Ha ocurrido un error en el service findTaskById: TaskService: ", error);
            throw handleError(error);
        }
    }
}