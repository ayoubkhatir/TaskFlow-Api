import z from "zod";

export const registerSchema = z.object({
    userName: z
        .string()
        .max(20, 'the user name should be less than 20 characters')
        .min(3, 'the user name should be more than 3 characters'),
    email: z.email(),
    password: z
        .string()
        .max(20, 'the user name should be less than 20 characters')
        .min(6, 'the password should be more than 6 characters'),
})

export type RegisterType = z.infer<typeof registerSchema>