import { BadRequestException } from '@nestjs/common';

export class KeyPairAlreadyCreatedException extends BadRequestException {
    constructor() {
        super('You have already generated key pair');
    }
}
