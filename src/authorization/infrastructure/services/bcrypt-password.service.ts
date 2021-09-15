import * as bcrypt from 'bcrypt';
import { IPasswordService } from '../../application/interfaces/password-service.interface';
import { HashedPassword } from '../../application/value-objects/hashed-password';

export class BcryptPasswordService implements IPasswordService {
    private readonly SALT_ROUNDS = 10;

    comparePassword(
        hashedPassword: HashedPassword,
        plainTextPassword: string,
    ): Promise<boolean> {
        return bcrypt.compare(plainTextPassword, hashedPassword.toString());
    }

    async hashPassword(plainTextPassword: string): Promise<HashedPassword> {
        const hash = await bcrypt.hash(plainTextPassword, this.SALT_ROUNDS);
        return HashedPassword.create(hash);
    }
}
