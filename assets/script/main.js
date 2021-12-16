"use strict";
const textArea = document.querySelector("#text-editor");
window.addEventListener("load", () => {
    pasteToTextArea();
});
function pasteToTextArea() {
    if (textArea == null) {
        console.error("No text field found.");
        return;
    }
    const hash = location.hash.substring(1);
    if (hash) {
        try {
            textArea.value = atob(hash);
        }
        catch (e) {
            textArea.value = "Invalid base64.";
        }
    }
}
function copyToClipboard() {
    if (textArea == null) {
        console.error("No text field found.");
        return;
    }
    const content = textArea.value;
    const base64 = btoa(content);
    navigator.clipboard.writeText(`https://paste.xpple.dev/#${base64}`)
        .then(() => {
        console.log("Async: Copying to clipboard was successful!");
    }, (err) => {
        console.error("Async: Could not copy text: ", err);
    });
    history.replaceState(null, '', `#${base64}`);
}
