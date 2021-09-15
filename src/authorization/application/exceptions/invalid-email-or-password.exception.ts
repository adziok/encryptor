import { BadRequestException } from '@nestjs/common';

export class InvalidEmailOrPasswordException extends BadRequestException {
    constructor() {
        super('Invalid email or password');
    }
}
