import z from "zod";
import { PriorityEnum, StatusTaskEnum } from "../enums";
import mongoose from "mongoose";

export const taskZodSchama = z.object({

    title: z.string(),
    description: z.string().optional(),
    dueDate: z.date().optional(),
    priority: z.enum(PriorityEnum),
    status: z.enum(StatusTaskEnum),
    user: z.instanceof(mongoose.Schema.Types.ObjectId).refine(
            val => val instanceof mongoose.Schema.Types.ObjectId,
            { message: "Debe ser un ObjectId válido de Mongoose" }
    ),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type TaskDto = z.infer<typeof taskZodSchama>;