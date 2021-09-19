export type RsaKeyPair = {
    publicKey: string;
    privateKey: string;
};

export const CRYPTO_SERVICE_TOKEN = 'CRYPTO_SERVICE_TOKEN';

export interface ICryptoService {
    generateRsaKeyPair(): Promise<RsaKeyPair>;
    encryptDataRsa(data: Buffer | string, publicKey: string): Buffer;
    encryptDataAes(data: Buffer, key: string): Buffer;
    randomAesKey(): string;
}
