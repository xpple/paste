const textArea: HTMLTextAreaElement | null = document.querySelector("#text-editor");
window.addEventListener("load", (): void => {
    pasteToTextArea();
});


function pasteToTextArea(): void {
    if (textArea == null) {
        console.error("No text field found.");
        return
    }
    const hash: string = location.hash.substring(1);
    if (hash) {
        try {
            textArea.value = atob(hash);
        } catch (e) {
            textArea.value = "Invalid base64.";
        }
    }
}

function copyToClipboard(): void {
    if (textArea == null) {
        console.error("No text field found.");
        return;
    }
    const content: string = textArea.value;
    const base64: string = btoa(content);
    navigator.clipboard.writeText(`https://paste.xpple.dev/#${base64}`)
        .then(() => {
            console.log("Async: Copying to clipboard was successful!");
            }, (err) => {
            console.error("Async: Could not copy text: ", err);
        });
    history.replaceState(null, '', `#${base64}`)
}
