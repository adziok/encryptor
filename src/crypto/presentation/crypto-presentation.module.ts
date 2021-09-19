import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CryptoController } from './controllers/crypto.controller';
import { CryptoModule } from '../infrastructure/crypto.module';

@Module({
    imports: [CryptoModule, HttpModule],
    controllers: [CryptoController],
})
export class CryptoPresentationModule {}
