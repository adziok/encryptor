export class HashedPassword {
    private constructor(private value: string) {}

    static create(value: string) {
        return new HashedPassword(value);
    }

    toString() {
        return this.value;
    }
}
