import { Transform, TransformCallback } from 'stream';

export class ToBase64TransformerPipe extends Transform {
    _transform(
        chunk: Buffer,
        encoding: BufferEncoding,
        callback: TransformCallback,
    ) {
        callback(null, chunk.toString('base64'));
    }
}
