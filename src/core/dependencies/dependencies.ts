import { logger } from "../logger/logger";
import { AssignmentDependencies } from "./assignmentDependencies/assignment.dependencies";
import { AuthDependencies } from "./authDependencies/auth.dependencies";
import { TaskDependencies } from "./taskDependencies/task.dependencies";
import { UserDependencies } from "./userDependencies/user.dependencies";

export const runAllDependencies = async () => {

    await UserDependencies();
    await TaskDependencies();
    await AssignmentDependencies();
    await AuthDependencies();

    logger.info('✅ Todas las dependencias han sido configuradas exitosamente.');
}