import mongoose from "mongoose";
import z from "zod";

export const assignmentZodSchama = z.object({

    task: z.instanceof(mongoose.Types.ObjectId).refine(
        val => val instanceof mongoose.Types.ObjectId,
        { message: "Debe ser un ObjectId válido de Mongoose" }
    ),
    assignedBy: z.instanceof(mongoose.Types.ObjectId).refine(
        val => val instanceof mongoose.Types.ObjectId,
        { message: "Debe ser un ObjectId válido de Mongoose" }
    ),
    assignedTo: z.instanceof(mongoose.Types.ObjectId).refine(
        val => val instanceof mongoose.Types.ObjectId,
        { message: "Debe ser un ObjectId válido de Mongoose" }
    ),
    assignUser: z.string(),
    titleTask: z.string(),
});

export type AssignmentDto = z.infer<typeof assignmentZodSchama>;