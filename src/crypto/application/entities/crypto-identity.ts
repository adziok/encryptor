import { UniqueID } from '../../../shared/unique-id';

export class CryptoIdentity {
    readonly id: UniqueID;

    constructor(public publicKey: string, public readonly userId: UniqueID) {
        this.id = UniqueID.create();
    }
}
