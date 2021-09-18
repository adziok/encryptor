import { INestApplication, ModuleMetadata } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as supertest from 'supertest';
import { AuthorizationModule } from '../../src/authorization/infrastructure/authorization.module';
import { AuthorizationPresentationModule } from '../../src/authorization/presentation/authorization-presentation.module';
import { AuthorizationActions } from '../actions/authorization.actions';
import { CryptoFacade } from '../../src/crypto/infrastructure/crypto.facade';
import { CryptoModule } from '../../src/crypto/infrastructure/crypto.module';
import { CryptoPresentationModule } from '../../src/crypto/presentation/crypto-presentation.module';
import { CryptoActions } from '../actions/crypto.actions';

export const createTestingModule = (metadata: ModuleMetadata = {}) => {
    return Test.createTestingModule({
        imports: [...(metadata?.imports || [])],
        controllers: metadata?.controllers,
        exports: metadata?.exports,
        providers: [...(metadata?.providers || [])],
    });
};

export const createTestingAppFromModule = async (
    module: TestingModule | Promise<TestingModule>,
) => {
    return (await module).createNestApplication();
};

export class RestSession {
    private agent: supertest.SuperAgentTest;
    authorizationActions: AuthorizationActions;
    cryptoActions: CryptoActions;

    constructor(app: INestApplication) {
        this.agent = supertest.agent(app.getHttpServer());
        this.authorizationActions = new AuthorizationActions(this.agent);
        this.cryptoActions = new CryptoActions(this.agent);
    }

    setAuthorization(token: string) {
        this.agent.set('Authorization', 'Bearer ' + token);
    }
}

export const createTestingApp = async () => {
    const module = createTestingModule({
        imports: [
            AuthorizationModule.registerAsync({
                useFactory: () => ({ secret: 'secret', hashingSaltRounds: 1 }),
            }),
            AuthorizationPresentationModule,
            CryptoModule,
            CryptoPresentationModule,
        ],
    }).compile();
    const app = await createTestingAppFromModule(module);
    await app.init();
    return { app, createRestSession: () => new RestSession(app) };
};
