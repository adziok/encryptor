import { Injectable } from '@nestjs/common';
import * as supertest from 'supertest';

@Injectable()
export class CryptoActions {
    constructor(private readonly agent: supertest.SuperTest<supertest.Test>) {}

    generateKeyPair() {
        return this.agent.post('/generate-key-pair').type('json').send();
    }

    encode() {
        return this.agent.post('/encode').type('json').send();
    }
}
