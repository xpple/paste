export class Compression {

    private readonly format: "gzip" | "deflate";

    public constructor(format: "gzip" | "deflate") {
        this.format = format;
    }

    public async compress64(data: string): Promise<string> {
        const compressedReadableStream: ReadableStream<Uint8Array> = new Blob([data])
            .stream()
            .pipeThrough(new CompressionStream(this.format));
        let result = "";
        const reader = compressedReadableStream.getReader();
        while (true) {
            const {done, value} = await reader.read();
            if (done || value == undefined) {
                break;
            }
            result += String.fromCharCode.apply(null, value);
        }
        return btoa(result);
    }

    public async decompress64(data: string): Promise<string> {
        const decodedData = atob(data);
        const u8 = new Uint8Array(decodedData.length);
        for (let i = 0; i < decodedData.length; ++i) {
            u8[i] = decodedData.charCodeAt(i);
        }
        const decompressedReadableStream: ReadableStream<Uint8Array> = new Blob([u8])
            .stream()
            .pipeThrough(new DecompressionStream(this.format));
        return new Response(decompressedReadableStream).text();
    }
}
