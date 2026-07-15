import { createInsertSchema, createSelectSchema } from "drizzle-orm/zod";
import { sessionsTable, tasksTable, usersTable } from "../db/schema";
import z from "zod";

export const selectUserSchema = createSelectSchema(usersTable);
export const insertUserSchema = createInsertSchema(usersTable);
export const loginUserSchema = selectUserSchema.pick({ email: true, password: true })

export type User = z.infer<typeof selectUserSchema>;
export type NewUser = z.infer<typeof insertUserSchema>;


export const selectTaskSchema = createSelectSchema(tasksTable)
export const insertTaskSchema = createInsertSchema(tasksTable)

export type Task = z.infer<typeof selectTaskSchema>
export type NewTask = z.infer<typeof insertTaskSchema>

export const selectSessionSchema = createSelectSchema(sessionsTable)
export const insertSessionSchema = createInsertSchema(sessionsTable)

export type Session = z.infer<typeof selectSessionSchema>
export type NewSession = z.infer<typeof insertSessionSchema>



export type LoginType = z.infer<typeof loginUserSchema>






export type UserId = string | null
