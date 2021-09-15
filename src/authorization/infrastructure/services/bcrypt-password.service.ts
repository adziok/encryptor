import { IPasswordService } from '../../application/interfaces/password-service.interface';
import { HashedPassword } from '../../application/value-objects/hashed-password';

export class BcryptPasswordService implements IPasswordService {
    comparePassword(
        password: HashedPassword,
        plainTextPassword: string,
    ): Promise<boolean> {
        return Promise.resolve(true);
    }

    hashPassword(plainTextPassword: string): Promise<HashedPassword> {
        return Promise.resolve(HashedPassword.create(plainTextPassword));
    }
}
