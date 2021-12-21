import { Compression } from "./Compression.js";
import { textArea } from "../main.js";
export class Utils {
    static async pasteToTextArea() {
        if (textArea == null) {
            console.error("No text field found.");
            return;
        }
        const hash = location.hash.substring(1);
        if (hash) {
            try {
                if (hash.charAt(0) === '!') {
                    textArea.value = await new Compression("gzip").decompress64(hash.substring(1));
                }
                else {
                    textArea.value = atob(hash);
                }
            }
            catch (e) {
                textArea.value = "Invalid base64.";
            }
        }
    }
    static async copyToClipboard(doCompress) {
        if (textArea == null) {
            console.error("No text field found.");
            return;
        }
        const content = textArea.value;
        const base64 = doCompress ? `!${await new Compression("gzip").compress64(content)}` : btoa(content);
        navigator.clipboard.writeText(`https://paste.xpple.dev/#${base64}`)
            .then(() => {
            console.log("Async: Copying to clipboard was successful!");
            if (doCompress) {
                console.warn("Warning: Compression is not yet supported by Firefox and Safari. Users of " +
                    "these browsers will not be able to view your paste.");
            }
        }, (err) => {
            console.error("Async: Could not copy text: ", err);
        });
        history.replaceState(null, '', `#${base64}`);
    }
}
