import { Injectable } from '@nestjs/common';
import { IAuthorizationRepository } from '../../application/interfaces/authorization.repository';
import { Authorization } from '../../application/entities/authorization';

@Injectable()
export class InMemoryAuthorizationRepository
    implements IAuthorizationRepository
{
    #collection = new Map<string, Authorization>();

    findByEmail(email: string): Authorization | null {
        return (
            [...this.#collection.values()].find(
                (authorization) => authorization.email === email,
            ) || null
        );
    }

    save(authorization: Authorization): void {
        this.#collection.set(authorization.id.toString(), authorization);
    }
}
