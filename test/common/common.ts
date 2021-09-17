import { INestApplication, ModuleMetadata } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as supertest from 'supertest';
import { AuthorizationModule } from '../../src/authorization/infrastructure/authorization.module';
import { AuthorizationPresentationModule } from '../../src/authorization/presentation/authorization-presentation.module';
import { AuthorizationActions } from '../actions/authorization.actions';

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
    authorizationActions: AuthorizationActions;

    constructor(app: INestApplication) {
        const agent = supertest.agent(app.getHttpServer());
        this.authorizationActions = new AuthorizationActions(agent);
    }
}

export const createTestingApp = async () => {
    const module = createTestingModule({
        imports: [
            AuthorizationModule.registerAsync({
                useFactory: () => ({ secret: 'secret', hashingSaltRounds: 1 }),
            }),
            AuthorizationPresentationModule,
        ],
    }).compile();
    const app = await createTestingAppFromModule(module);
    await app.init();
    return { app, createRestSession: () => new RestSession(app) };
};
