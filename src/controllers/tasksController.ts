import { eq } from "drizzle-orm";
import db from "../db";
import { tasksTable, usersTable } from "../db/schema";
import { ApiResponse, ErrorCodes, fail, success } from "../types/apiTypes";
import { NewTask, Task, UserId } from "../types/Types";

class TasksController {
    async createTask(data: NewTask, userId: UserId): Promise<ApiResponse<null>> {
        try {
            const newData = { ...data, userId }
            const [task] = await db.insert(tasksTable).values(newData).returning()
            if (!task) {
                return fail(ErrorCodes.INTERNAL_SERVER_ERROR, "task creation failed")
            }
            return success(null, "task created successfully")
        }
        catch (error) {
            console.error(error)
            return fail(ErrorCodes.INTERNAL_SERVER_ERROR, "task creation failed")
        }
    }


    async getTasks(userId: string): Promise<ApiResponse<Task[] | null>> {
        try {
            const [foundUser] = await db.select().from(usersTable).where(eq(usersTable.id, userId))
            if (!foundUser) {
                return fail(ErrorCodes.USER_NOT_FOUND, "the user doesn't exist")
            }
            const tasks = await db.select().from(tasksTable).where(eq(tasksTable.userId, userId))
            if (tasks.length === 0) {
                return success(null, "the user doesn't have any tasks")
            }
            return success(tasks, "user tasks selection succeed")

        } catch (error) {
            console.error(error)
            return fail(ErrorCodes.INTERNAL_SERVER_ERROR, "problem occured")
        }
    }
}

export const tasksController = new TasksController