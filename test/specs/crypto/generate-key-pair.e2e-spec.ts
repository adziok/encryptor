import { defineFeature, loadFeature } from 'jest-cucumber';
import { createTestingApp, RestSession } from '../../common/common';
import * as supertest from 'supertest';

const feature = loadFeature('test/specs/crypto/generate-key-pair.feature');

defineFeature(feature, (test) => {
    test('User generate key pair first time', async ({ given, when, then }) => {
        let session: RestSession;
        let response: supertest.Response;

        given(
            /^I'm login to the app and never generate keys before$/,
            async () => {
                const { createRestSession } = await createTestingApp();
                session = createRestSession();
                const { body } = await session.authorizationActions.signIn({
                    email: 'test@test.com',
                    password: 'zaq1@WSX',
                });
                session.setAuthorization(body.authToken);
            },
        );

        when(/^I send generate key pair request$/, async () => {
            response = await session.cryptoActions.generateKeyPair();
        });

        then(/^I should receive key pair$/, async () => {
            expect(response.body).toEqual({
                privateKey: expect.any(String),
                publicKey: expect.any(String),
            });
        });
    });

    test('User generate key pair for the next time', async ({
        given,
        when,
        then,
    }) => {
        let session: RestSession;
        let response: supertest.Response;

        given(
            /^I'm login to the app and already generate keys before$/,
            async () => {
                const { createRestSession } = await createTestingApp();
                session = createRestSession();
                const { body } = await session.authorizationActions.signIn({
                    email: 'test@test.com',
                    password: 'zaq1@WSX',
                });
                session.setAuthorization(body.authToken);
                await session.cryptoActions.generateKeyPair();
            },
        );

        when(/^I send generate key pair request$/, async () => {
            response = await session.cryptoActions.generateKeyPair();
        });

        then(
            /^I should receive exception with inform me about already existing crypto identity in the app$/,
            async () => {
                expect(response.body.message).toBe(
                    'You have already generated key pair',
                );
            },
        );
    });
});
