import { eq } from "drizzle-orm";
import db from "../db";
import { sessionsTable, usersTable } from "../db/schema";
import PasswordHasher from "../utils/passwordHasher";
import { LoginType, NewUser, Session } from "../types/Types";
import { ApiResponse, ErrorCodes, fail, success } from "../types/apiTypes";


class AuthController {
    async register(user: NewUser): Promise<ApiResponse<NewUser>> {
        try {
            const normalisedEmail = user.email.trim().toLowerCase()

            const [existingUser] = await db.select({ id: usersTable.id }).from(usersTable).where(eq(usersTable.email, normalisedEmail));
            if (existingUser) {
                return fail(ErrorCodes.EMAIL_ALREADY_EXISTS, "this email is already used")
            }
            const hashedPassword = await PasswordHasher.hash(user.password);
            const newUser = { ...user, password: hashedPassword }
            await db.insert(usersTable).values(newUser)
            return success(newUser, "user created successfully")
        }
        catch (error) {
            console.error({ error })
            return fail(ErrorCodes.INTERNAL_SERVER_ERROR, "user creation failed")
        }
    }

    async login(user: LoginType): Promise<ApiResponse<Session>> {

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

}

export const authController = new AuthController();