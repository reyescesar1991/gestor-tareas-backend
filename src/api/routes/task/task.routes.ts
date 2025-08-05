import { container } from "tsyringe";
import { Router } from 'express';
import { TaskController } from "../../../controllers/task/task.controller";

// Esto nos da una instancia del AuthController con todas sus dependencias ya inyectadas
const taskController = container.resolve(TaskController);

const router = Router();

router.post('/create-task', taskController.createTask);
router.post('/update-task', taskController.updateTask);
router.post('/get-tasks', taskController.findTasks);
router.post('/get-task-by-id', taskController.findTaskById);

export default router;