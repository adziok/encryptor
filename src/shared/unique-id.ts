import { v4 } from 'uuid';
import { isUUID } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

export class UniqueID {
    #value: string;

    private constructor(value: string) {
        this.#value = value;
    }

    static create(uuid?: string) {
        if (uuid && !isUUID(uuid)) {
            throw new BadRequestException('Invalid uuid');
        }

        return new UniqueID(uuid || v4());
    }
}
