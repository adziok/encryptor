import { Module } from '@nestjs/common';
import { AuthorizationFacade } from './authorization.facade';
import {
    AUTHORIZATION_REPOSITORY_TOKEN,
    IAuthorizationRepository,
} from '../application/interfaces/authorization.repository';
import { InMemoryAuthorizationRepository } from './persistance/in-memory-authorization.repository';
import { AuthorizationService } from '../application/authorization.service';
import {
    IPasswordService,
    PASSWORD_SERVICE_TOKEN,
} from '../application/interfaces/password-service.interface';
import { BcryptPasswordService } from './services/bcrypt-password.service';

@Module({
    providers: [
        AuthorizationFacade,
        {
            provide: AUTHORIZATION_REPOSITORY_TOKEN,
            useClass: InMemoryAuthorizationRepository,
        },
        {
            provide: PASSWORD_SERVICE_TOKEN,
            useClass: BcryptPasswordService,
        },
        {
            provide: AuthorizationService,
            useFactory: (
                passwordService: IPasswordService,
                authorizationRepository: IAuthorizationRepository,
            ) =>
                new AuthorizationService(
                    passwordService,
                    authorizationRepository,
                ),
            inject: [PASSWORD_SERVICE_TOKEN, AUTHORIZATION_REPOSITORY_TOKEN],
        },
    ],
})
export class AuthorizationModule {}
