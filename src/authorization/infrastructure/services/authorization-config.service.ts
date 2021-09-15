import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthorizationConfigService {
    constructor(
        public hashingSaltRounds: number,
        private jwtSecret: string | Buffer,
    ) {}
}
