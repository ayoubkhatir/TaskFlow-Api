import { createInsertSchema, createSelectSchema } from "drizzle-orm/zod"
import z from "zod"
import { sessionsTable } from "../db/schema"

export const registerUserSchema = z.object({
    name: z
        .string()
        .max(20, 'the user name should be less than 20 characters')
        .min(3, 'the user name should be more than 3 characters'),
    email: z.email(),
    password: z
        .string()
        .max(20, 'the user name should be less than 20 characters')
        .min(6, 'the password should be more than 6 characters'),
})

export const loginUserSchema = z.object({
    email: z.email(),
    password: z
        .string()
        .max(20, 'the user name should be less than 20 characters')
        .min(6, 'the password should be more than 6 characters'),
})

export type RegisterUserInput = z.infer<typeof registerUserSchema>
export type LoginUserInput = z.infer<typeof loginUserSchema>


// export const selectSessionSchema = createSelectSchema(sessionsTable)
// export const insertSessionSchema = createInsertSchema(sessionsTable)

export type Session = typeof sessionsTable.$inferSelect
export type NewSession = typeof sessionsTable.$inferInsert
