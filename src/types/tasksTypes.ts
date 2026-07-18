import z from "zod"
import { tasksTable } from "../db/schema"

export enum Priority {
    HIGH = "high",
    MEDIUM = "medium",
    LOW = "low"
}

export const selectTaskSchema = z.object({
    title: z.string(),
    description: z.string(),
    priority: z.enum([Priority.HIGH, Priority.MEDIUM, Priority.LOW]),
    createdAt: z.string(),
    dueDate: z.string(),
    category: z.array(z.string())
})

export const createTaskSchema = z.object({
    title: z.string().min(5, "the minimum title length is 5 characters").max(100, "the maximum title length is 100 character"),
    description: z.string().min(5, "the minimum descritption length is 5 characters").max(255, "the maximum descritption length is 100 character"),
    priority: z.enum([Priority.HIGH, Priority.MEDIUM, Priority.LOW]),
    dueDate: z.string(),
    category: z.string()
})

export type CreateTaskInput = z.infer<typeof createTaskSchema>


export type Task = typeof tasksTable.$inferSelect
export type NewTask = typeof tasksTable.$inferInsert