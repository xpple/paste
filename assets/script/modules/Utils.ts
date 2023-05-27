import {Compression} from "./Compression.js";
import {textArea} from "../main.js";


export class Utils {
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
            textArea.value = await new Compression("gzip").decompress64(hash.substring(1));
        } catch (e) {
            console.log(e);
            textArea.value = "Invalid base64.";
        }
    }

    static async copyToClipboard(doCompress: boolean): Promise<void> {
        if (textArea == null) {
            console.error("No text field found.");
            return;
        }
        const content = textArea.value;
        const base64 = await new Compression("gzip").compress64(content);
        navigator.clipboard.writeText(`https://paste.xpple.dev/#${base64}`)
            .then(() => {
                console.log("Async: Copying to clipboard was successful!");
            }, (err) => {
                console.error("Async: Could not copy text: ", err);
            });
        history.replaceState(null, '', `#${base64}`);
    }
}
