import { eq } from "drizzle-orm";
import db from "../db";
import { tasksTable } from "../db/schema";
import { ApiResponse, ErrorCodes, fail, success } from "../types/apiTypes";
import { CreateTaskInput, NewTask, Task } from "../types/tasksTypes";

interface ITasksController {
    createTask: (data: CreateTaskInput, userId: string) => Promise<ApiResponse<null>>
    getTasks: (userId: string) => Promise<ApiResponse<Task[] | null>>
    getTask: (userId: string, taskId: string) => Promise<ApiResponse<Task | null>>
    deleteTask: (userId: string, TaskId: string) => Promise<ApiResponse<null>>
}

class TasksController implements ITasksController {
    async createTask(data: CreateTaskInput, userId: string): Promise<ApiResponse<null>> {
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
            const tasks = await db.select().from(tasksTable).where(eq(tasksTable.userId, userId))
            if (tasks.length === 0) {
                return success([], "user has no tasks")
            }
            return success(tasks, "user tasks selection succeed")
        } catch (error) {
            console.error(error)
            return fail(ErrorCodes.INTERNAL_SERVER_ERROR, "problem occured")
        }
    }



    async getTask(userId: string, taskId: string): Promise<ApiResponse<Task | null>> {
        return {
            success: true,
            message: "",
            data: null
        }
    }

    async deleteTask(userId: string, taskId: string): Promise<ApiResponse<null>> {
        return {
            success: true,
            message: "",
            data: null
        }
    }
}

export const tasksController = new TasksController