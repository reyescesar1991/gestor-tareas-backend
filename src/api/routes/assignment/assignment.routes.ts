import { container } from "tsyringe";
import { Router } from 'express';
import { AssignmentController } from "../../../controllers/assignment/assignment.controller";

// Esto nos da una instancia del AuthController con todas sus dependencias ya inyectadas
const assignmentController = container.resolve(AssignmentController);

const router = Router();

router.post('/assignment-task', assignmentController.createAssignment);
router.post('/get-assignment-by-user', assignmentController.findAssignmentByUserId);
router.post('/get-assignment-by-id', assignmentController.findAssignmentById);

export default router;