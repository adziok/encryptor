import { Injectable } from '@nestjs/common';
import { ICryptoService } from './interfaces/crypto-service.interface';

@Injectable()
export class EncryptService {
    constructor(private cryptoService: ICryptoService) {}

    encryptData(data: string | Buffer, publicKey: string) {
        return this.cryptoService.encryptData(data, publicKey);
    }
}
