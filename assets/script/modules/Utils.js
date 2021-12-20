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
                textArea.value = await new Compression("gzip").decompress64(hash);
            }
            catch (e) {
                textArea.value = "Invalid base64.";
            }
        }
    }
    static async copyToClipboard() {
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