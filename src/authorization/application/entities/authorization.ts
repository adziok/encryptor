import { HashedPassword } from '../value-objects/hashed-password';
import { UniqueID } from '../../../shared/unique-id';

export class Authorization {
    #id: UniqueID;
    #email: string;
    #password: HashedPassword;

    get id() {
        return this.#id;
    }

    get email() {
        return this.#email;
    }

    get password() {
        return this.#password;
    }

    static create(email: string, password: HashedPassword) {
        const authorization = new Authorization();
        authorization.#id = UniqueID.create();
        authorization.#email = email;
        authorization.#password = password;
        return authorization;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}
}
