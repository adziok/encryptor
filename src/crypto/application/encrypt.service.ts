import { Injectable } from '@nestjs/common';
import { ICryptoService } from './interfaces/crypto-service.interface';

@Injectable()
export class EncryptService {
    constructor(private cryptoService: ICryptoService) {}

    encryptDataUsingRsa(data: string | Buffer, publicKey: string) {
        return this.cryptoService.encryptDataRsa(data, publicKey);
    }

    encryptDataUsingAes(data: Buffer, key: string) {
        return this.cryptoService.encryptDataAes(data, key);
    }

    randomAesKey() {
        return this.cryptoService.randomAesKey();
    }
}
