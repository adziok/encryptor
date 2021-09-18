import { Injectable } from '@nestjs/common';
import { ICryptoIdentityRepository } from '../../application/interfaces/crypto-identity-repository.interface';
import { CryptoIdentity } from '../../application/entities/crypto-identity';

@Injectable()
export class InMemoryCryptoIdentityRepository
    implements ICryptoIdentityRepository
{
    #collection = new Map<string, CryptoIdentity>();

    findByUserId(userId: string): CryptoIdentity | null {
        return (
            [...this.#collection.values()].find(
                (cryptoIdentity) => cryptoIdentity.userId.toString() === userId,
            ) || null
        );
    }

    save(cryptoIdentity: CryptoIdentity): void {
        this.#collection.set(cryptoIdentity.id.toString(), cryptoIdentity);
    }
}
