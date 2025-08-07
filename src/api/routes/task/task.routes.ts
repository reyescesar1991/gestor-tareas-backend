import { container } from "tsyringe";
import { Router } from 'express';
import { TaskController } from "../../../controllers/task/task.controller";
import { validateCreateTaskData } from "../../middleware/task/createTask.middleware";
import { authMiddleware } from "../../middleware/auth.middleware";
import { validateUpdateTaskData } from "../../middleware/task/updateTask.middleware";

// Esto nos da una instancia del AuthController con todas sus dependencias ya inyectadas
const taskController = container.resolve(TaskController);

const router = Router();

router.post('/create-task', validateCreateTaskData, taskController.createTask);
router.post('/update-task', validateUpdateTaskData, taskController.updateTask);
router.get('/get-tasks', authMiddleware, taskController.findTasks);
router.post('/get-task-by-id', taskController.findTaskById);

export default router;