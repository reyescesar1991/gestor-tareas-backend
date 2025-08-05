import z from "zod";
import { PriorityEnum, StatusTaskEnum } from "../enums";
import mongoose from "mongoose";

export const taskZodSchema = z.object({

    title: z.string(),
    description: z.string().optional(),
    dueDate: z.date(),
    priority: z.enum(PriorityEnum),
    status: z.enum(StatusTaskEnum),
    user: z.instanceof(mongoose.Schema.Types.ObjectId).refine(
            val => val instanceof mongoose.Schema.Types.ObjectId,
            { message: "Debe ser un ObjectId válido de Mongoose" }
    ),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export const taskUpdateZodSchema = z.object({

    title: z.string().optional(),
    description: z.string().optional(),
    dueDate: z.date().optional(),
    priority: z.enum(PriorityEnum).optional(),
    status: z.enum(StatusTaskEnum).optional(),
    user: z.instanceof(mongoose.Schema.Types.ObjectId).refine(
            val => val instanceof mongoose.Schema.Types.ObjectId,
            { message: "Debe ser un ObjectId válido de Mongoose" }
    ),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type TaskDto = z.infer<typeof taskZodSchema>;
export type TaskUpdateDto = z.infer<typeof taskUpdateZodSchema>;