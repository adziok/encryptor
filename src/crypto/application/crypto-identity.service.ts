import { Injectable, NotFoundException } from '@nestjs/common';
import {
    ICryptoService,
    RsaKeyPair,
} from './interfaces/crypto-service.interface';
import { KeyPairAlreadyCreatedException } from './exceptions/key-pair-already-created.exception';
import { ICryptoIdentityRepository } from './interfaces/crypto-identity-repository.interface';
import { UniqueID } from '../../shared/unique-id';
import { CryptoIdentity } from './entities/crypto-identity';

@Injectable()
export class CryptoIdentityService {
    constructor(
        private cryptoIdentityRepository: ICryptoIdentityRepository,
        private cryptoService: ICryptoService,
    ) {}

    async createKeyPair(userId: string): Promise<RsaKeyPair> {
        await this.checkIfCryptoKeyAlreadyExists(userId);

        const rsaKeyPair = await this.cryptoService.generateRsaKeyPair();
        const newCryptoIdentity = new CryptoIdentity(
            rsaKeyPair.publicKey,
            UniqueID.create(userId),
        );
        this.cryptoIdentityRepository.save(newCryptoIdentity);

        return rsaKeyPair;
    }

    async getPublicKeyOrThrow(userId: string): Promise<string> {
        const cryptoIdentity =
            this.cryptoIdentityRepository.findByUserId(userId);
        if (!cryptoIdentity) {
            throw new NotFoundException('Crypto identity not found');
        }
        return cryptoIdentity.publicKey;
    }

    private async checkIfCryptoKeyAlreadyExists(userId: string) {
        const cryptoIdentity =
            this.cryptoIdentityRepository.findByUserId(userId);
        if (cryptoIdentity) {
            throw new KeyPairAlreadyCreatedException();
        }
    }
}
