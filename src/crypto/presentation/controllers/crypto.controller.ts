import { Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CryptoFacade } from '../../infrastructure/crypto.facade';
import { HttpService } from '@nestjs/axios';
import {
    Authenticated,
    CurrentUser,
    ICurrentUser,
} from '../../../authorization/infrastructure/decorators';
import { GeneratedKeyPairResponseDto } from '../dtos/generated-key-pair-response.dto';
import { ToBase64TransformerPipe } from '../../infrastructure/stream-pipes/to-base64-transformer.pipe';

@Controller()
export class CryptoController {
    constructor(
        private cryptoFacade: CryptoFacade,
        private httpService: HttpService,
    ) {}

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
        @Res() res: Response,
        @CurrentUser() user: ICurrentUser,
    ): Promise<any> {
        const { transformer: encryptionTransformer, encryptionKey } =
            await this.cryptoFacade.getAesEncryptionStreamTransformer();
        const encryptedAesEncryptionKey =
            await this.cryptoFacade.encryptMessage(user.id, encryptionKey);

        res.setHeader('encryption-key', encryptedAesEncryptionKey);

        return this.httpService
            .get('http://www.africau.edu/images/default/sample.pdf', {
                responseType: 'stream',
            })
            .subscribe(({ data, status }) => {
                data.pipe(encryptionTransformer)
                    .pipe(new ToBase64TransformerPipe())
                    .pipe(res);
            });
    }
}
