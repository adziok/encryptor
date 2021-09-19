import { defineFeature, loadFeature } from 'jest-cucumber';
import { createTestingApp, RestSession } from '../../common/common';
import * as supertest from 'supertest';

const feature = loadFeature('test/specs/crypto/encode-file-using-rsa.feature');

defineFeature(feature, (test) => {
    test('User encrypt file after creating key pair', async ({
        given,
        when,
        then,
    }) => {
        let session: RestSession;
        let response: supertest.Response;

        given(/^I login to the app and generate key pair$/, async () => {
            const { createRestSession } = await createTestingApp();
            session = createRestSession();
            const { body } = await session.authorizationActions.signIn({
                email: 'test@test.com',
                password: 'zaq1@WSX',
            });
            session.setAuthorization(body.authToken);
            await session.cryptoActions.generateKeyPair();
        });

        when(/^I send encode file request$/, async () => {
            response = await session.cryptoActions.encode();
        });

        then(
            /^I should receive base64 response and encryption key$/,
            async () => {
                expect(response.text).toEqual(expect.any(String));
                expect(response.body?.error).toBeUndefined();
                expect(response.headers).toEqual(
                    expect.objectContaining({
                        'encryption-key': expect.any(String),
                    }),
                );
            },
        );
    });

    test('User encrypt file without generating key pair', async ({
        given,
        when,
        then,
    }) => {
        let session: RestSession;
        let response: supertest.Response;

        given(
            /^I login to the app without generating key pair before$/,
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

        when(/^I send encode file request$/, async () => {
            response = await session.cryptoActions.encode();
        });

        then(/^I should receive error response$/, async () => {
            expect(response.body.message).toBe('Crypto identity not found');
        });
    });
});
