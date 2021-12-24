declare class DecompressionStream {
    constructor(format: string);

    readonly readable: ReadableStream<Uint8Array>;
    readonly writable: WritableStream<BufferSource>;
}

declare class CompressionStream {
    constructor(format: string);

    readonly readable: ReadableStream<Uint8Array>;
    readonly writable: WritableStream<BufferSource>;
}
