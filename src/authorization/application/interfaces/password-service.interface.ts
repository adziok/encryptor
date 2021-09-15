import { HashedPassword } from '../value-objects/hashed-password';

export const PASSWORD_SERVICE_TOKEN = 'PASSWORD_SERVICE_TOKEN';

export interface IPasswordService {
    hashPassword(plainTextPassword: string): Promise<HashedPassword>;
    comparePassword(
        password: HashedPassword,
        plainTextPassword: string,
    ): Promise<boolean>;
}
