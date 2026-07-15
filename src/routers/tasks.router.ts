import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { insertTaskSchema, NewTask } from "../types/Types";
import { tasksController } from "../controllers/tasksController";
import { authMiddleware } from "../middlewares/authMiddleware";

export const tasksRouter = new Hono()
    .post('/create', authMiddleware, zValidator("json", insertTaskSchema), async (c) => {
        const userId = c.get('userId')
        const data: NewTask = c.req.valid('json')

        try {
            const response = await tasksController.createTask(data, userId)
            if (response.success) {
                return c.json(response, 201)
            }
            return c.json(response, 500)
        } catch (error) {
            console.error(error)
        }
    })
// .get('/', authMiddleware, async (c) => {

// })