import { CryptoIdentity } from '../entities/crypto-identity';

export const CRYPTO_IDENTITY_REPOSITORY_TOKEN =
    'CRYPTO_IDENTITY_REPOSITORY_TOKEN';

export interface ICryptoIdentityRepository {
    findByUserId(userId: string): CryptoIdentity | null;
    save(cryptoKeyPair: CryptoIdentity): void;
}
