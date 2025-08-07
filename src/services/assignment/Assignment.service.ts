import { delay, inject, injectable } from "tsyringe";
import { Transactional } from "../../core/utils/transactional-wrapper";
import { ClientSession } from "mongoose";
import { TransactionManager } from "../../core/database/transactionManager";
import { AssignmentDocument } from "../../core/models/assignment.model";
import { AssignmentValidator, TaskValidator, UserValidator } from "../../core/validators";
import { AssignmentDto } from "../../core/zodValidators";
import { IAssignmentRepository } from "./interfaces/IAssignment.repository";
import { ObjectIdParam } from "../../core/zodValidators/idMongo.validator";
import { handleError } from "../../core/utils/handleErrors";
import { UserService } from "../user/User.service";
import { TaskService } from "../task/Task.service";
import { logger } from "../../core/logger/logger";

@injectable()
export class AssignmentService{

    constructor(
        @inject("AssignmentRepository") private readonly assignmentRepository: IAssignmentRepository,
        @inject("TransactionManager") private readonly transactionManager: TransactionManager,
        @inject(AssignmentValidator) private readonly assignmentValidator: AssignmentValidator,
        @inject(delay(() => TaskService)) private readonly taskService: TaskService,
        @inject(delay(() => UserService)) private readonly userService: UserService,
    ){}

    @Transactional()
    async createAssignment(dataCreateAssignment : AssignmentDto, session ?: ClientSession) : Promise<AssignmentDocument | null>{

        try {

            logger.debug("--Data para la creacion de una asignacion: ", dataCreateAssignment);
            logger.info("----Iniciando creacion de una asignacion en el service: AssignmentService----");

            await this.taskService.findTaskById(dataCreateAssignment.task, session);

            logger.info("----Se ha validado que la tarea exista----");

            await this.userService.findUser(dataCreateAssignment.assignedBy, session);

            logger.info("----Se ha validado que el usuario asignado exista----")

            await this.userService.findUser(dataCreateAssignment.assignedTo, session);

            logger.info("----Se ha validado que el usuario receptor exista----");

            const newAssignment =  await this.assignmentRepository.createAssignment(dataCreateAssignment, session);

            logger.debug("----Se ha creado la asignacion----", newAssignment);
            logger.info("----Operacion existosa: Se ha creado la asignacion con exito----")

            return newAssignment;
            
        } catch (error) {
            
            logger.error("Ha ocurrido un error en el service createAssignment: AssignmentService: ", error);
            throw handleError(error);
        }
    }

    @Transactional()
    async findAssignmentByUserId(idUser: ObjectIdParam, session?: ClientSession): Promise<AssignmentDocument | null>{
        
        try {

            logger.debug("--Data para la busqueda de una asignacion por id de usuario: ", idUser);
            logger.info("----Iniciando busqueda de una asignacion en el service: AssignmentService----");

            const assignment = await this.assignmentRepository.findAssignmentByUserId(idUser, session);

            logger.debug("----Se ha encontrado la asignacion----", assignment);

            this.assignmentValidator.validateAssignmentExists(assignment);

            logger.info("----Operacion existosa: Se ha encontrado la asignacion con exito----");

            return assignment;
            
        } catch (error) {
            
            logger.error("Ha ocurrido un error en el service findAssignmentByUserId: AssignmentService: ", error);
            throw handleError(error);
        }
    }

    @Transactional()
    async findAssignmentById(idAssignment: ObjectIdParam, session?: ClientSession): Promise<AssignmentDocument | null>{
        
        try {

            logger.debug("--Data para la busqueda de una asignacion por Id: ", idAssignment);
            logger.info("----Iniciando busqueda de una asignacion en el service: AssignmentService----");

            const assignment = await this.assignmentRepository.findAssignmentById(idAssignment, session);

            logger.debug("----Se ha encontrado la asignacion----", assignment)

            this.assignmentValidator.validateAssignmentExists(assignment);

            logger.info("----Operacion existosa: Se ha encontrado la asignacion con exito----")

            return assignment;
            
        } catch (error) {
            
            logger.error("Ha ocurrido un error en el service findAssignmentById: AssignmentService: ", error);
            throw handleError(error);
        }
    }
}