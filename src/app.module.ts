import { Module } from '@nestjs/common';
import { AuthorizationModule } from './authorization/infrastructure/authorization.module';
import { AuthorizationPresentationModule } from './authorization/presentation/authorization-presentation.module';
import { CryptoModule } from './crypto/infrastructure/crypto.module';
import { CryptoPresentationModule } from './crypto/presentation/crypto-presentation.module';

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
        CryptoModule,
        CryptoPresentationModule,
    ],
})
export class AppModule {}
