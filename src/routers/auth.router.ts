import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { authController } from "../controllers/authController";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { ErrorCodes } from "../types/apiTypes";
import { loginUserSchema, registerUserSchema } from "../types/authTypes";
import { NewUser } from "../types/userTypes";
import { authMiddleware } from "../middlewares/authMiddleware";
import db from "../db";
import { sessionsTable } from "../db/schema";
import { eq } from "drizzle-orm";

export const authRouter = new Hono()
    .post("/register", zValidator('json', registerUserSchema), async (c) => {
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
        const user = c.req.valid('json');
        try {
            const response = await authController.login(user);
            if (response.success) {
                const session = response.data
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
    .post("/logout", authMiddleware, async (c) => {
        const sessionId = getCookie(c, "session")
        try {
            if (!sessionId) {
                return c.json({
                    success: false,
                    code: ErrorCodes.UNAUTHORIZED,
                    message: "Unauthorised"
                }, 401)
            }
            const response = await authController.logout(sessionId)
            if (response.success) {
                deleteCookie(c, "session")
                return c.json({ response }, 200)
            }
            return c.json({ response }, 500)
        } catch (error) {
            console.log(error)
        }
    })