import { defineFeature, loadFeature } from 'jest-cucumber';
import { createTestingApp, RestSession } from '../../common/common';
import { DefineScenarioFunctionWithAliases } from 'jest-cucumber/dist/src/feature-definition-creation';
import * as supertest from 'supertest';
import { isJWT } from 'class-validator';

const feature = loadFeature('test/specs/authorization/authorization.feature');

const singInScenario = (
    scenarioName: string,
    test: DefineScenarioFunctionWithAliases,
) =>
    test(scenarioName, async ({ given, when, then }) => {
        let email: string;
        let session: RestSession;
        let response: supertest.Response;

        given(
            /^I provide valid credentials with email: "(.*)"$/,
            async (userEmail: string) => {
                email = userEmail;
                const { createRestSession } = await createTestingApp();
                session = createRestSession();
            },
        );

        when(/^I send sign in request$/, async () => {
            response = await session.authorizationActions.signIn({
                email,
                password: 'zaq1@WSX',
            });
        });

        then(/^I should receive token$/, () => {
            expect(response.body.authToken).toBeDefined();
            expect(isJWT(response.body.authToken)).toBeTruthy();
        });
    });

defineFeature(feature, (test) => {
    singInScenario('Account sign in to the app', test);
    singInScenario('Second account sign in to the app', test);
});
