import { eq } from "drizzle-orm";
import db from "../db";
import { sessionsTable, usersTable } from "../db/schema";
import PasswordHasher from "../utils/passwordHasher";
import { ApiResponse, ErrorCodes, fail, success } from "../types/apiTypes";
import { LoginUserInput, RegisterUserInput, Session } from "../types/authTypes";
import { NewUser } from "../types/userTypes";


class AuthController {
    async register(user: RegisterUserInput): Promise<ApiResponse<NewUser>> {
        try {
            const normalisedEmail = user.email.trim().toLowerCase()

            const [existingUser] = await db.select({ id: usersTable.id }).from(usersTable).where(eq(usersTable.email, normalisedEmail));
            if (existingUser) {
                return fail(ErrorCodes.EMAIL_ALREADY_EXISTS, "this email is already used")
            }
            const hashedPassword = await PasswordHasher.hash(user.password);
            const newUser: NewUser = { ...user, password: hashedPassword }
            await db.insert(usersTable).values(newUser)
            return success(newUser, "user created successfully")
        }
        catch (error) {
            console.error({ error })
            return fail(ErrorCodes.INTERNAL_SERVER_ERROR, "user creation failed")
        }
    }

    async login(user: LoginUserInput): Promise<ApiResponse<Session>> {

        const normalisedEmail = user.email.trim().toLowerCase()
        try {
            const [existingUser] = await db.select({ password: usersTable.password, email: usersTable.email, id: usersTable.id }).from(usersTable).where(eq(usersTable.email, normalisedEmail))

            if (!existingUser) {
                return fail(ErrorCodes.INVALID_CREDENTIALS, "the credentials are false")
            }

            const passwordMatch: boolean = await PasswordHasher.verify(user.password, existingUser.password)
            if (passwordMatch === false) {
                return fail(ErrorCodes.INVALID_CREDENTIALS, "the credentials are false")
            }
            const [session] = await db.insert(sessionsTable).values({
                userId: existingUser.id
            }).returning()

            console.log(session)

            if (!session) {
                return fail(ErrorCodes.INTERNAL_SERVER_ERROR, "session creation failed")
            }

            return success(session, "login happened successfully")
        }
        catch (error) {
            console.error({ error })
            return fail(ErrorCodes.INTERNAL_SERVER_ERROR, "user login failed")
        }
    }

    async logout(sessionId: string) {
        if (!sessionId) {
            return fail(ErrorCodes.UNAUTHORIZED, "this user is unauthorised")
        }
        try {
            await db.delete(sessionsTable).where(eq(sessionsTable.id, sessionId))
            return success(null, "user logged out successfully")
        } catch (error) {
            console.log(error)
            return fail(ErrorCodes.INTERNAL_SERVER_ERROR, "something went wrong")
        }

    }

}

export const authController = new AuthController();