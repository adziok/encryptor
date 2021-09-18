import { EncryptService } from '../application/encrypt.service';
import { CryptoIdentityService } from '../application/crypto-identity.service';

export class CryptoFacade {
    constructor(
        private encryptService: EncryptService,
        private cryptoIdentityService: CryptoIdentityService,
    ) {}

    async getEncryptionPipe(
        userId: string,
    ): Promise<(data: string | Buffer) => Buffer> {
        const publicKey = await this.cryptoIdentityService.getPublicKeyOrThrow(
            userId,
        );

        return (data) => this.encryptService.encryptData(data, publicKey);
    }

    createKeyPair(userId: string) {
        return this.cryptoIdentityService.createKeyPair(userId);
    }
}
