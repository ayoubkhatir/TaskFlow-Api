import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import db from "../db";
import { sessionsTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { UserId } from "../types/Types";



type Variables = {
    userId: UserId
}


export const authMiddleware = createMiddleware<{
    Variables: Variables
}>(async (c, next) => {
    const sessionId = getCookie(c, "session")
    console.log(sessionId)
    if (!sessionId) {
        return c.json({ message: "Unauthorised" }, 401)
    }

    const [session] = await db.select().from(sessionsTable).where(eq(sessionsTable.id, sessionId)).limit(1)

    console.log(session)
    if (!session) {
        return c.json({ message: "Unauthorised" }, 401)
    }


    if (session.expiresAt < new Date()) {
        await db.delete(sessionsTable).where(eq(sessionsTable.id, session.id))
        return c.json({ message: "Unauthorised" }, 401)
    }

    const userId = session.userId

    console.log(session.userId)
    c.set("userId", userId)
    await next()
})