export class Compression {
    format;
    constructor(format) {
        this.format = format;
    }
    async compress64(data) {
        const compressedReadableStream = new Blob([data])
            .stream()
            .pipeThrough(new CompressionStream(this.format));
        let result = "";
        const reader = compressedReadableStream.getReader();
        while (true) {
            const { done, value } = await reader.read();
            if (done || value == undefined) {
                break;
            }
            result += String.fromCharCode.apply(null, value);
        }
        return btoa(result);
    }
    async decompress64(data) {
        const decodedData = atob(data);
        const u8 = new Uint8Array(decodedData.length);
        for (let i = 0; i < decodedData.length; ++i) {
            u8[i] = decodedData.charCodeAt(i);
        }
        const decompressedReadableStream = new Blob([u8])
            .stream()
            .pipeThrough(new DecompressionStream(this.format));
        return new Response(decompressedReadableStream).text();
    }
}
