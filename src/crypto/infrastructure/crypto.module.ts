import { Module } from '@nestjs/common';
import {
    CRYPTO_IDENTITY_REPOSITORY_TOKEN,
    ICryptoIdentityRepository,
} from '../application/interfaces/crypto-identity-repository.interface';
import { InMemoryCryptoIdentityRepository } from './persistance/in-memory-crypto-identity-repository';
import {
    CRYPTO_SERVICE_TOKEN,
    ICryptoService,
} from '../application/interfaces/crypto-service.interface';
import { NodeCryptoService } from './services/node-crypto.service';
import { CryptoIdentityService } from '../application/crypto-identity.service';
import { EncryptService } from '../application/encrypt.service';

@Module({
    providers: [
        {
            provide: CRYPTO_IDENTITY_REPOSITORY_TOKEN,
            useClass: InMemoryCryptoIdentityRepository,
        },
        {
            provide: CRYPTO_SERVICE_TOKEN,
            useClass: NodeCryptoService,
        },
        {
            provide: CryptoIdentityService,
            useFactory: (
                cryptoIdentityRepository: ICryptoIdentityRepository,
                cryptoService: ICryptoService,
            ) =>
                new CryptoIdentityService(
                    cryptoIdentityRepository,
                    cryptoService,
                ),
            inject: [CRYPTO_IDENTITY_REPOSITORY_TOKEN, CRYPTO_SERVICE_TOKEN],
        },
        {
            provide: EncryptService,
            useFactory: (cryptoService: ICryptoService) =>
                new EncryptService(cryptoService),
            inject: [CRYPTO_SERVICE_TOKEN],
        },
    ],
})
export class CryptoModule {}
