import { Module } from '@nestjs/common';
import { AuthorizationModule } from './authorization/infrastructure/authorization.module';

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
    controllers: [],
    providers: [],
})
export class AppModule {}
