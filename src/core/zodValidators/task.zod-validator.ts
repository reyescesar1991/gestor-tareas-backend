import z from "zod";
import { PriorityEnum, StatusTaskEnum } from "../enums";

export const taskZodSchema = z.object({

    title: z.string(),
    description: z.string().optional(),
    dueDate: z.string().transform((val, ctx) => {
        // Intenta crear un objeto Date a partir del string
        const date = new Date(val);

        // Verifica si la fecha es válida
        if (isNaN(date.getTime())) {
            ctx.addIssue({
                code: z.ZodIssueCode.invalid_type,
                expected: "date",
                message: 'Invalid date format',
            });
            return z.NEVER;
        }

        // Si es válida, transforma el string en un objeto Date
        return date;
    }),
    priority: z.enum(PriorityEnum),
    status: z.enum(StatusTaskEnum),
});

export const taskUpdateZodSchema = z.object({

    title: z.string().optional(),
    description: z.string().optional(),
    dueDate: z.date().optional(),
    priority: z.enum(PriorityEnum).optional(),
    status: z.enum(StatusTaskEnum).optional(),
});

export type TaskDto = z.infer<typeof taskZodSchema>;
export type TaskUpdateDto = z.infer<typeof taskUpdateZodSchema>;