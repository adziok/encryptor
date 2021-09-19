import { Injectable } from '@nestjs/common';
import { Transform } from 'stream';
import { EncryptService } from '../application/encrypt.service';
import { CryptoIdentityService } from '../application/crypto-identity.service';
import { AesEncryptionTransformPipe } from './stream-pipes/aes-encryption-transform.pipe';

@Injectable()
export class CryptoFacade {
    constructor(
        private encryptService: EncryptService,
        private cryptoIdentityService: CryptoIdentityService,
    ) {}

    async encryptMessage(userId: string, data: string): Promise<string> {
        const publicKey = await this.cryptoIdentityService.getPublicKeyOrThrow(
            userId,
        );

        return this.encryptService
            .encryptDataUsingRsa(data, publicKey)
            .toString('base64');
    }

    async getAesEncryptionStreamTransformer(): Promise<{
        transformer: Transform;
        encryptionKey: string;
    }> {
        const encryptionKey = this.encryptService.randomAesKey();
        const transformer = new AesEncryptionTransformPipe((data) =>
            this.encryptService.encryptDataUsingAes(data, encryptionKey),
        );

        return { encryptionKey, transformer };
    }

    createKeyPair(userId: string) {
        return this.cryptoIdentityService.createKeyPair(userId);
    }
}
