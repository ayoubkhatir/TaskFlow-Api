import { eq } from "drizzle-orm";
import db from "../db";
import { usersTable } from "../db/schema";
import PasswordHasher from "../utils/passwordHasher";
import { LoginType, NewUser, User } from "../types/Types";
import { ApiResponse } from "../types/apiTypes";


class AuthController {
    async register(user: NewUser): Promise<ApiResponse> {
        try {
            const normalisedEmail = user.email.trim().toLowerCase()

            const [existingUser] = await db.select({ id: usersTable.id }).from(usersTable).where(eq(usersTable.email, normalisedEmail));
            if (existingUser) {
                return {
                    success: false,
                    message: "user already exists"
                }
            }
            const hashedPassword = await PasswordHasher.hash(user.password);
            const newUser = { ...user, password: hashedPassword }
            await db.insert(usersTable).values(newUser);
        }
        catch (error) {
            console.error({ error })
            return {
                success: false,
                message: "user creation failed"
            }
        }
        return {
            success: true,
            message: "user created successfully"
        }
    }




    async login(user: LoginType): Promise<ApiResponse> {

        const normalisedEmail = user.email.trim().toLowerCase()

        const [existingUser] = await db.select({ password: usersTable.password, email: usersTable.email }).from(usersTable).where(eq(usersTable.email, normalisedEmail))

        if (!existingUser) {
            return {
                success: false,
                message: "the credentials are false"
            }
        }

        const passwordMatch: boolean = await PasswordHasher.verify(user.password, existingUser.password)
        if (passwordMatch === false) {
            return {
                success: false,
                message: "the credentials are false"
            }
        }

        return {
            success: true,
            message: "login happened successfully"
        }
    }




























}

export const authController = new AuthController();