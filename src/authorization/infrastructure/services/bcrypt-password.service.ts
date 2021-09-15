import * as bcrypt from 'bcrypt';
import { IPasswordService } from '../../application/interfaces/password-service.interface';
import { HashedPassword } from '../../application/value-objects/hashed-password';
import { AuthorizationConfigService } from './authorization-config.service';

export class BcryptPasswordService implements IPasswordService {
    constructor(
        private authorizationConfigService: AuthorizationConfigService,
    ) {}

    comparePassword(
        hashedPassword: HashedPassword,
        plainTextPassword: string,
    ): Promise<boolean> {
        return bcrypt.compare(plainTextPassword, hashedPassword.toString());
    }

    async hashPassword(plainTextPassword: string): Promise<HashedPassword> {
        const hash = await bcrypt.hash(
            plainTextPassword,
            this.authorizationConfigService.hashingSaltRounds,
        );
        return HashedPassword.create(hash);
    }
}
