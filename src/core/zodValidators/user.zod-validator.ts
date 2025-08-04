import z from "zod";

export const userZodSchama = z.object({

    name : z.string(),
    lastname : z.string(),
    username : z.string(),
    password : z.string(),
    email : z.string(),
    phone : z.string(),
});

export type UserDto = z.infer<typeof userZodSchama>;