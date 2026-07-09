import { createInsertSchema, createSelectSchema } from "drizzle-orm/zod";
import { usersTable } from "../db/schema";
import z from "zod";

export const selectUserSchema = createSelectSchema(usersTable);
export const insertUserSchema = createInsertSchema(usersTable);
export const loginUserSchema = selectUserSchema.pick({ email: true, password: true })

export type User = z.infer<typeof selectUserSchema>;
export type NewUser = z.infer<typeof insertUserSchema>;



export type LoginType = z.infer<typeof loginUserSchema>