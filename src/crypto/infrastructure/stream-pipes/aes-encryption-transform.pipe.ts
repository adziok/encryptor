import { Transform, TransformCallback } from 'stream';

export class AesEncryptionTransformPipe extends Transform {
    constructor(private encryptionFunction: (data: Buffer) => Buffer) {
        super();
    }

    _transform(
        chunk: any,
        encoding: BufferEncoding,
        callback: TransformCallback,
    ) {
        callback(null, this.encryptionFunction(chunk));
    }
}
