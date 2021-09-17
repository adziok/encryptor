import { DynamicModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { AuthorizationFacade } from './authorization.facade';
import {
    AUTHORIZATION_REPOSITORY_TOKEN,
    IAuthorizationRepository,
} from '../application/interfaces/authorization.repository';
import { InMemoryAuthorizationRepository } from './persistance/in-memory-authorization.repository';
import { AuthorizationService } from '../application/authorization.service';
import {
    PASSWORD_SERVICE_TOKEN,
    IPasswordService,
} from '../application/interfaces/password-service.interface';
import { BcryptPasswordService } from './services/bcrypt-password.service';
import { AuthorizationConfigService } from './services/authorization-config.service';
import { JwtService } from './services/jwt.service';
import { strategies } from './strategies';
import { AuthorizationSeeder } from './authorization.seeder';

export interface IAuthorizationOptions extends JwtModuleOptions {
    hashingSaltRounds: number;
}

export type AuthModuleRegisterFactory = (
    ...args: any[]
) => IAuthorizationOptions;

@Module({})
export class AuthorizationModule {
    static registerAsync(opts: {
        useFactory: AuthModuleRegisterFactory;
        inject?: any[];
    }): DynamicModule {
        return {
            module: AuthorizationModule,
            imports: [
                PassportModule,
                JwtModule.registerAsync({
                    useFactory: (authorizationConfig: IAuthorizationOptions) =>
                        opts.useFactory(authorizationConfig),
                    inject: opts.inject,
                }),
            ],
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
                    inject: [
                        PASSWORD_SERVICE_TOKEN,
                        AUTHORIZATION_REPOSITORY_TOKEN,
                    ],
                },
                {
                    provide: AuthorizationConfigService,
                    useFactory: (
                        authorizationConfig: IAuthorizationOptions,
                    ) => {
                        const options = opts.useFactory(authorizationConfig);
                        return new AuthorizationConfigService(
                            options.hashingSaltRounds,
                            options.secret,
                        );
                    },
                    inject: opts.inject,
                },
                JwtService,
                ...strategies,
                AuthorizationSeeder,
            ],
            exports: [AuthorizationFacade],
        };
    }

    register(): DynamicModule {
        return {
            module: AuthorizationModule,
            imports: [],
            providers: [AuthorizationFacade],
            exports: [AuthorizationFacade],
        };
    }
}
