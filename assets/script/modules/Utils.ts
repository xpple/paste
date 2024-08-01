import {textArea} from "../main.js";

export class Utils {

    private static readonly FORMAT = 'deflate';

    static async pasteToTextArea(): Promise<void> {
        if (textArea == null) {
            console.error("No text field found.");
            return;
        }
        const hash = location.hash;
        if (!hash) {
            return;
        }
        try {
            textArea.value = await Utils.decompress64(hash.substring(1));
        } catch (e) {
            console.log(e);
            textArea.value = "Invalid base64.";
        }
    }

    static async copyToClipboard(): Promise<void> {
        if (textArea == null) {
            console.error("No text field found.");
            return;
        }
        const content = textArea.value;
        const base64 = await Utils.compress64(content);
        navigator.clipboard.writeText(`https://paste.xpple.dev/#${base64}`)
            .then(() => {
                console.log("Async: Copying to clipboard was successful!");
            }, (err) => {
                console.error("Async: Could not copy text: ", err);
            });
        history.replaceState(null, '', `#${base64}`);
        textArea.focus();
    }

    private static async compress64(data: string): Promise<string> {
        const compressedReadableStream: ReadableStream<Uint8Array> = new Blob([data])
            .stream()
            .pipeThrough(new CompressionStream(Utils.FORMAT));
        let result = "";
        const reader = compressedReadableStream.getReader();
        while (true) {
            const {done, value} = await reader.read();
            if (done || value == undefined) {
                break;
            }
            result += String.fromCharCode(...value);
        }
        return btoa(result);
    }

    private static async decompress64(data: string): Promise<string> {
        const decodedData = atob(data);
        const u8 = new Uint8Array(decodedData.length);
        for (let i = 0; i < decodedData.length; ++i) {
            u8[i] = decodedData.charCodeAt(i);
        }
        const decompressedReadableStream: ReadableStream<Uint8Array> = new Blob([u8])
            .stream()
            .pipeThrough(new DecompressionStream(Utils.FORMAT));
        return new Response(decompressedReadableStream).text();
    }
}
