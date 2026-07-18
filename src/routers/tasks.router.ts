import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { tasksController } from "../controllers/tasksController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { createTaskSchema } from "../types/tasksTypes";

export const tasksRouter = new Hono()
    .post('/create', authMiddleware, zValidator("json", createTaskSchema), async (c) => {
        const userId = c.get('userId')
        console.log("userId : ", userId)
        const data = c.req.valid('json')

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
    .get('/', authMiddleware, async (c) => {
        const userId = c.get("userId")
        try {
            const response = await tasksController.getTasks(userId)
            if (response.success) {
                return c.json(response, 200)
            }
            return c.json(response, 500)
        } catch (error) {
            console.log(error)
        }
    })