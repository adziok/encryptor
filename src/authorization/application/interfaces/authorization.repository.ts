import { Authorization } from '../entities/authorization';

export const AUTHORIZATION_REPOSITORY_TOKEN = 'AUTHORIZATION_REPOSITORY_TOKEN';

export interface IAuthorizationRepository {
    findByEmail(email: string): Authorization | null;
    save(authorization: Authorization): void;
}
