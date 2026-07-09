import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { insertUserSchema, loginUserSchema, NewUser } from "../types/Types";
import { authController } from "../controllers/authController";
import z from "zod";

export const authRouter = new Hono()
    .post("/register", zValidator('json', insertUserSchema), async (c) => {
        const user: NewUser = c.req.valid('json');
        console.log(user)
        try {
            const response = await authController.register(user);
            if (response.success === false) {
                return c.json(response, 400)
            } else {
                return c.json(response, 201)
            }
        } catch (error) {
            console.log(error)
            // if (error instanceof z.ZodError) {
            //     return c.json({
            //         success: false,
            //         errors: error.issues
            //     }, 400)
            // }
            // return c.json({
            //     success: false,
            //     message: "internal server error"
            // }, 500)
        }
    })
    .post("/login", zValidator('json', loginUserSchema), async (c) => {
        try {
            const user = c.req.valid('json');
            console.log(user)
            const response = await authController.login(user);
            if (response.success === false) {
                return c.json(response, 400)
            } else {
                return c.json(response, 201)
            }
        } catch (error) {
            console.log(error)
            //  if (error instanceof z.ZodError) {
            //     return c.json({
            //         success: false,
            //         errors: error.issues
            //     }, 400)
            // }
            // return c.json({
            //     success: false,
            //     message: "internal server error"
            // }, 500)
        }
    })