import { Injectable } from '@nestjs/common';
import * as supertest from 'supertest';
import { SignInDto } from '../../src/authorization/presentation/dtos/sign-in.dto';

@Injectable()
export class AuthorizationActions {
    constructor(private readonly agent: supertest.SuperTest<supertest.Test>) {}

    signIn(signInDto: SignInDto) {
        return this.agent.post('/sign-in').type('json').send(signInDto);
    }
}
