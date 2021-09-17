import { Injectable, OnModuleInit } from '@nestjs/common';
import { AuthorizationFacade } from './authorization.facade';

@Injectable()
export class AuthorizationSeeder implements OnModuleInit {
    constructor(private authorizationFacade: AuthorizationFacade) {}

    async onModuleInit() {
        await this.authorizationFacade.signUp('test2@test.com', 'zaq1@WSX');
        await this.authorizationFacade.signUp('test@test.com', 'zaq1@WSX');
    }
}
