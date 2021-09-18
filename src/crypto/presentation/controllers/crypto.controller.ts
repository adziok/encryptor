import { Controller, Post } from '@nestjs/common';
import { CryptoFacade } from '../../infrastructure/crypto.facade';
import {
    Authenticated,
    CurrentUser,
    ICurrentUser,
} from '../../../authorization/infrastructure/decorators';
import { GeneratedKeyPairResponseDto } from '../dtos/generated-key-pair-response.dto';

@Controller()
export class CryptoController {
    constructor(private cryptoFacade: CryptoFacade) {}

    @Authenticated()
    @Post('generate-key-pair')
    async generateKeyPair(
        @CurrentUser() user: ICurrentUser,
    ): Promise<GeneratedKeyPairResponseDto> {
        return this.cryptoFacade.createKeyPair(user.id);
    }

    @Authenticated()
    @Post('encode')
    async encode(
        @CurrentUser() user: ICurrentUser,
    ): Promise<GeneratedKeyPairResponseDto> {
        return this.cryptoFacade.createKeyPair(user.id);
    }
}
