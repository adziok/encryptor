import { HashedPassword } from '../value-objects/hashed-password';
import { UniqueID } from '../../../shared/unique-id';

export class Authorization {
    private _id: UniqueID;
    private _email: string;
    private _password: HashedPassword;

    get id() {
        return this._id;
    }

    get email() {
        return this._email;
    }

    get password() {
        return this._password;
    }

    static create(email: string, password: HashedPassword) {
        const authorization = new Authorization();
        authorization._id = UniqueID.create();
        authorization._email = email;
        authorization._password = password;
        return authorization;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}
}
