import { delay, inject, injectable } from "tsyringe";
import { AssignmentService } from "../../services/assignment/Assignment.service";
import { Request, Response, NextFunction } from "express";
import { logger } from "../../core/logger/logger";
import { AssignmentDto } from "../../core/zodValidators";
import { sendSuccessResponse } from "../../core/helper/api/successResponse.helper";
import { ObjectIdParam, objectIdSchema } from "../../core/zodValidators/idMongo.validator";

@injectable()
export class AssignmentController {

    constructor(
        @inject(delay(() => AssignmentService)) private readonly assignmentService: AssignmentService
    ) { }

    public createAssignment = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {

        try {

            logger.info('AssignmentController: Inicio del proceso de creacion de asignacion'); // Inicio del método

            console.log(req.body);
            

            const createAssignmentDto: AssignmentDto = {

                titleTask: req.body.titleTask,
                assignUser: req.body.assignUser,
                task:req.body.task,
                assignedBy:req.body.assignedBy,
                assignedTo:req.body.assignedTo,
            };

            logger.info('AssignmentController: Datos enviados por el usuario', createAssignmentDto);

            // 1. Llama al servicio de crear asignacion
            logger.info('AssignmentController: Llamando al servicio AssignmentController.createAssignment.');
            const result = await this.assignmentService.createAssignment(createAssignmentDto);

            logger.info(`AssignmentController: Asignacion creada de forma exitosa.`);
            logger.debug({ message: 'AssignmentController: Preparando respuesta de éxito: ', data: result });
            sendSuccessResponse(res, 200, {}, "Asignacion creada exitosamente");

        } catch (error) {

            // Log de error en el catch
            logger.error({ message: 'AssignmentController: Error durante la creacion de asignacion', error });
            // Si el código es incorrecto, el servicio lanzará una excepción que será manejada aquí.
            next(error);
        }
    }

    public findAssignmentByUserId = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {

        try {

            logger.info('AssignmentController: Inicio del proceso de busqueda de asignacion'); // Inicio del método

            const idUserAssignment: ObjectIdParam = req.body.idUserAssignment;

            logger.info('AssignmentController: Datos enviados por el usuario', idUserAssignment);

            // 1. Llama al servicio de crear asignacion
            logger.info('AssignmentController: Llamando al servicio AssignmentController.findAssignmentByUserId.');
            const result = await this.assignmentService.findAssignmentByUserId(idUserAssignment);

            logger.info(`AssignmentController: Asignacion encontrada de forma exitosa por id de usuario.`);
            logger.debug({ message: 'AssignmentController: Preparando respuesta de éxito: ', data: result });
            sendSuccessResponse(res, 200, {}, "Asignacion encontrada exitosamente por id de usuario");

            
        } catch (error) {
            
            // Log de error en el catch
            logger.error({ message: 'AssignmentController: Error durante la busqueda de la asignacion', error });
            // Si el código es incorrecto, el servicio lanzará una excepción que será manejada aquí.
            next(error);
        }
    }

    public findAssignmentById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {

        try {

            logger.info('AssignmentController: Inicio del proceso de busqueda de asignacion'); // Inicio del método

            const idUserAssignment: ObjectIdParam = req.body.idAssignment;

            logger.info('AssignmentController: Datos enviados por el usuario', idUserAssignment);

            // 1. Llama al servicio de crear asignacion
            logger.info('AssignmentController: Llamando al servicio AssignmentController.findAssignmentById.');
            const result = await this.assignmentService.findAssignmentById(idUserAssignment);

            logger.info(`AssignmentController: Asignacion encontrada de forma exitosa por id.`);
            logger.debug({ message: 'AssignmentController: Preparando respuesta de éxito: ', data: result });
            sendSuccessResponse(res, 200, {}, "Asignacion encontrada exitosamente por id");
            
        } catch (error) {
            
            // Log de error en el catch
            logger.error({ message: 'AssignmentController: Error durante la busqueda de la asignacion', error });
            // Si el código es incorrecto, el servicio lanzará una excepción que será manejada aquí.
            next(error);
        }
    }

    public findAssignments = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        try {

            logger.info('AssignmentController: Inicio del proceso de busqueda de asignacion'); // Inicio del método

            // 1. Llama al servicio de crear asignacion
            logger.info('AssignmentController: Llamando al servicio AssignmentController.findAssignments.');
            const result = await this.assignmentService.findAssignments();

            logger.info(`AssignmentController: Asignacion encontrada de forma exitosa por id.`);
            logger.debug({ message: 'AssignmentController: Preparando respuesta de éxito: ', data: result });
            sendSuccessResponse(res, 200, result, "Asignaciones encontradas exitosamente por id");
            
        } catch (error) {
            
            // Log de error en el catch
            logger.error({ message: 'AssignmentController: Error durante la busqueda de las asignaciones', error });
            // Si el código es incorrecto, el servicio lanzará una excepción que será manejada aquí.
            next(error);
        }
    }
}
