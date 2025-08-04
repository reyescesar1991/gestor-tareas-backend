import { container } from "tsyringe";
import { AssignmentModel } from "../../models";
import { TransactionManager } from "../../database/transactionManager";
import { AssignmentValidator } from "../../validators";
import { IAssignmentRepository } from "../../../services/assignment/interfaces/IAssignment.repository";
import { AssignmentRepositoryImpl } from "../../../services/assignment/repositories/assignment.repository";

export const TaskDependencies = async () => {

    container.register("TransactionManager", TransactionManager);
    container.register("AssignmentModel", {useValue : AssignmentModel});

    container.register("AssignmentValidator", {useValue : AssignmentValidator});

    container.register<IAssignmentRepository>("IAssignmentRepository", {useClass : AssignmentRepositoryImpl});
}