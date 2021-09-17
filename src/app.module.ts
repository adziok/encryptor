import { Module } from '@nestjs/common';
import { AuthorizationModule } from './authorization/infrastructure/authorization.module';
import { AuthorizationPresentationModule } from './authorization/presentation/authorization-presentation.module';

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
        AuthorizationPresentationModule,
    ],
})
export class AppModule {}
