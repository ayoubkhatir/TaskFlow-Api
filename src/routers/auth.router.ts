import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { insertUserSchema, loginUserSchema, NewUser } from "../types/Types";
import { authController } from "../controllers/authController";
import { setCookie } from "hono/cookie";
import { ErrorCodes } from "../types/apiTypes";

export const authRouter = new Hono()
    .post("/register", zValidator('json', insertUserSchema), async (c) => {
        const user: NewUser = c.req.valid('json');
        try {
            const response = await authController.register(user);
            if (response.success) {
                return c.json(response, 201)
            }

            switch (response.code) {
                case ErrorCodes.EMAIL_ALREADY_EXISTS:
                    return c.json(response, 409)
                case ErrorCodes.INTERNAL_SERVER_ERROR:
                    return c.json(response, 500)
            }
        } catch (error) {
            console.log(error)
        }
    })
    .post("/login", zValidator('json', loginUserSchema), async (c) => {
        try {
            const user = c.req.valid('json');
            const response = await authController.login(user);
            if (response.success) {
                const session = response.data
                console.log(session)
                setCookie(c, "session", session.id, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "Lax",
                    expires: session.expiresAt,
                    path: "/",
                })
                return c.json(response, 200);
            }
            else {
                switch (response.code) {
                    case ErrorCodes.INVALID_CREDENTIALS:
                        return c.json(response, 401)
                    case ErrorCodes.INTERNAL_SERVER_ERROR:
                        return c.json(response, 500)
                }
            }
        } catch (error) {
            console.log(error)
        }
    })