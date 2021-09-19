import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import {
    ICryptoService,
    RsaKeyPair,
} from '../../application/interfaces/crypto-service.interface';

@Injectable()
export class NodeCryptoService implements ICryptoService {
    generateRsaKeyPair(): Promise<RsaKeyPair> {
        return new Promise((resolve, reject) => {
            crypto.generateKeyPair(
                'rsa',
                {
                    modulusLength: 2048,
                    publicKeyEncoding: {
                        type: 'spki',
                        format: 'pem',
                    },
                    privateKeyEncoding: {
                        type: 'pkcs8',
                        format: 'pem',
                        cipher: 'aes-256-cbc',
                        passphrase: Date.now().toString(),
                    },
                },
                (err, publicKey, privateKey) => {
                    if (!err) {
                        resolve({ publicKey, privateKey });
                    }
                    reject(err);
                },
            );
        });
    }

    encryptDataRsa(data: Buffer | string, publicKey: string): Buffer {
        const buffer = (data instanceof Buffer && data) || Buffer.from(data);
        return crypto.publicEncrypt(
            {
                key: publicKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: 'sha256',
            },
            buffer,
        );
    }

    encryptDataAes(data: Buffer, stringKey: string): Buffer {
        const iv = crypto.randomBytes(16);
        const secret =
            NodeCryptoService.generateSha256HashFromString(stringKey);
        const cipher = crypto.createCipheriv('aes-256-ctr', secret, iv);

        return Buffer.concat([cipher.update(data), cipher.final()]);
    }

    randomAesKey(): string {
        return crypto.randomBytes(32).toString();
    }

    private static generateSha256HashFromString(secret: string): Buffer {
        return crypto.createHash('sha256').update(secret).digest();
    }
}
