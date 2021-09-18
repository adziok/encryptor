export type RsaKeyPair = {
    publicKey: string;
    privateKey: string;
};

export const CRYPTO_SERVICE_TOKEN = 'CRYPTO_SERVICE_TOKEN';

export interface ICryptoService {
    generateRsaKeyPair(): Promise<RsaKeyPair>;
    encryptData(data: Buffer | string, publicKey: string): Buffer;
}
