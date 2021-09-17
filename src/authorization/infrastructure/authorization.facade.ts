import { Injectable } from '@nestjs/common';
import { AuthorizationService } from '../application/authorization.service';
import { JwtService } from './services/jwt.service';

type JwtToken = string;

@Injectable()
export class AuthorizationFacade {
    constructor(
        private authorizationService: AuthorizationService,
        private jwtService: JwtService,
    ) {}

    async signIn(email: string, password: string): Promise<JwtToken> {
        const payload = await this.authorizationService.signIn(email, password);
        return this.jwtService.signPayload(payload);
    }

    async signUp(email: string, password: string) {
        await this.authorizationService.signUp(email, password);
    }
}
