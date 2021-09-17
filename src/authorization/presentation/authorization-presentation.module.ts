import { Module } from '@nestjs/common';
import { AuthorizationController } from './controllers/authorization.controller';
import { AuthorizationModule } from '../infrastructure/authorization.module';

@Module({
    imports: [
        AuthorizationModule.registerAsync({
            useFactory: () => ({
                hashingSaltRounds: 10,
                secret: 'secret',
                signOptions: {
                    expiresIn: '300s',
                },
            }),
        }),
    ],
    controllers: [AuthorizationController],
})
export class AuthorizationPresentationModule {}
