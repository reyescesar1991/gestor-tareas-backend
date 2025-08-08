import { delay, inject, injectable } from "tsyringe";
import { TaskService } from "../../services/task/Task.service";
import { Request, Response, NextFunction } from "express";
import { logger } from "../../core/logger/logger";
import { TaskDto } from "../../core/zodValidators";
import { sendSuccessResponse } from "../../core/helper/api/successResponse.helper";
import { TaskUpdateDto } from "../../core/zodValidators/task.zod-validator";
import { ObjectIdParam } from "../../core/zodValidators/idMongo.validator";

@injectable()
export class TaskController {

    constructor(
        @inject(delay(() => TaskService)) private readonly taskService: TaskService
    ) { }

    /*
    * Verifica la existencia del tarea en el sistema para validarlo
    */
    public createTask = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {

        try {

            logger.info('TaskController: Inicio del proceso de creacion de tarea'); // Inicio del método

            const createTask: TaskDto = req.body;

            logger.info('TaskController: Datos enviados por el usuario', createTask);

            // 1. Llama al servicio de crear tarea
            logger.info('TaskController: Llamando al servicio TaskService.createTask.');
            const result = await this.taskService.createTask(createTask);

            logger.info(`TaskController: tarea creado de forma exitosa.`);
            logger.debug({ message: 'TaskController: Preparando respuesta de éxito: ', data: result });
            sendSuccessResponse(res, 200, {}, "Tarea creada exitosamente");

        } catch (error) {

            // Log de error en el catch
            logger.error({ message: 'TaskController: Error durante la creacion del tarea', error });
            // Si el código es incorrecto, el servicio lanzará una excepción que será manejada aquí.
            next(error);
        }
    }

    public updateTask = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {

        try {

            logger.info('TaskController: Inicio del proceso de actualizacion de tarea'); // Inicio del método

            const updateTask: TaskUpdateDto = req.body.dataUpdateTask;
            const idTask: ObjectIdParam = req.body.idTask;

            console.log(req.body);
            

            logger.info('TaskController: Datos enviados por el usuario', updateTask);
            // logger.info('TaskController: Datos enviados por el usuario', req.body.idTask);

            // 1. Llama al servicio de crear tarea
            logger.info('TaskController: Llamando al servicio TaskService.updateTask.');
            const result = await this.taskService.updateTask(idTask, updateTask);

            logger.info(`TaskController: tarea actualizada de forma exitosa.`);
            logger.debug({ message: 'TaskController: Preparando respuesta de éxito: ', data: result });
            sendSuccessResponse(res, 200, {}, "tarea actualizada exitosamente");

        } catch (error) {

            // Log de error en el catch
            logger.error('TaskController: Error durante la actualizacion de la tarea', {
        errorName: error.name,
        errorMessage: error.message
    });
            // Si el código es incorrecto, el servicio lanzará una excepción que será manejada aquí.
            next(error);
        }
    }

    public findTasks = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {

        try {

            logger.info('TaskController: Inicio del proceso de obtencion de tareas'); // Inicio del método


            // 1. Llama al servicio de crear tarea
            logger.info('TaskController: Llamando al servicio TaskService.updateTask.');
            const result = await this.taskService.findTasks();

            logger.info(`TaskController: tareas encontradas de forma exitosa.`);
            logger.debug({ message: 'TaskController: Preparando respuesta de éxito: ', data: result });
            sendSuccessResponse(res, 200, result, "tareas encontradas exitosamente");

        } catch (error) {

            // Log de error en el catch
            logger.error({ message: 'TaskController: Error durante la busqueda de las tareas', error });
            // Si el código es incorrecto, el servicio lanzará una excepción que será manejada aquí.
            next(error);
        }
    }

    public findTaskById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {

        try {

            logger.info('TaskController: Inicio del proceso de busqueda de tarea por id'); // Inicio del método

            const idTask: ObjectIdParam = req.body.idTask;

            logger.info('TaskController: Datos enviados por el usuario', idTask);

            // 1. Llama al servicio de crear tarea
            logger.info('TaskController: Llamando al servicio TaskService.findTaskById.');
            const result = await this.taskService.findTaskById(idTask);

            logger.info(`TaskController: tarea encontrada por ID de forma exitosa.`);
            logger.debug({ message: 'TaskController: Preparando respuesta de éxito: ', data: result });
            sendSuccessResponse(res, 200, {}, "tarea encontrada por ID exitosamente");

        } catch (error) {

            // Log de error en el catch
            logger.error({ message: 'TaskController: Error durante la busqueda de la tarea', error });
            // Si el código es incorrecto, el servicio lanzará una excepción que será manejada aquí.
            next(error);
        }
    }

    public deleteTask = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {

        try {

            logger.info('TaskController: Inicio del proceso de eliminacion de tarea por id'); // Inicio del método

            const idTask: ObjectIdParam = req.body.idTask;

            logger.info('TaskController: Datos enviados por el usuario', idTask);

            // 1. Llama al servicio de crear tarea
            logger.info('TaskController: Llamando al servicio TaskService.deleteTask.');
            const result = await this.taskService.deleteTask(idTask);

            logger.info(`TaskController: tarea eliminada por ID de forma exitosa.`);
            logger.debug({ message: 'TaskController: Preparando respuesta de éxito: ', data: result });
            sendSuccessResponse(res, 200, {}, "Tarea eliminada por ID exitosamente");

            
        } catch (error) {
            
            // Log de error en el catch
            logger.error({ message: 'TaskController: Error durante la eliminacion de la tarea', error });
            // Si el código es incorrecto, el servicio lanzará una excepción que será manejada aquí.
            next(error);
        }
    }



}