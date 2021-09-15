import { Injectable } from '@nestjs/common';
import { IPasswordService } from './interfaces/password-service.interface';
import { IAuthorizationRepository } from './interfaces/authorization.repository';
import { InvalidEmailOrPasswordException } from './exceptions/invalid-email-or-password.exception';
import { Authorization } from './entities/authorization';

@Injectable()
export class AuthorizationService {
    constructor(
        private passwordService: IPasswordService,
        private authorizationRepository: IAuthorizationRepository,
    ) {}

    async signIn(email: string, password: string) {
        const authorization = this.authorizationRepository.findByEmail(email);
        if (!authorization) {
            throw new InvalidEmailOrPasswordException();
        }

        const isPasswordCorrect = await this.passwordService.comparePassword(
            authorization.password,
            password,
        );
        if (!isPasswordCorrect) {
            throw new InvalidEmailOrPasswordException();
        }

        return { email: authorization.email };
    }

    async signUp(email: string, password: string) {
        const authorization = this.authorizationRepository.findByEmail(email);
        if (!authorization) {
            return;
        }

        const hashedPassword = await this.passwordService.hashPassword(
            password,
        );

        const newAuthorization = Authorization.create(email, hashedPassword);
        this.authorizationRepository.save(newAuthorization);
    }
}
