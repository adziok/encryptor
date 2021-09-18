import { Module } from '@nestjs/common';
import { CryptoController } from './controllers/crypto.controller';
import { CryptoModule } from '../infrastructure/crypto.module';

@Module({
    imports: [CryptoModule],
    controllers: [CryptoController],
})
export class CryptoPresentationModule {}
