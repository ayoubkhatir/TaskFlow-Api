import bcrypt from 'bcrypt';

export default class PasswordHasher {

    static async hash(password: string) {
        const hashedPassword = await bcrypt.hash(password, 12);
        return hashedPassword;
    }
    static async verify(password: string, hashedPassword: string): Promise<boolean> {
        const isValid = await bcrypt.compare(password, hashedPassword)
        return isValid
    }
}

