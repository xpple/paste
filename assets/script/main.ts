import {Utils} from "./modules/Utils.js";


export const textArea: HTMLTextAreaElement | null = document.querySelector("#text-editor");
textArea?.focus();
window.addEventListener('load', () => Utils.pasteToTextArea());

const saveButton: HTMLLinkElement | null = document.querySelector("#save");
if (saveButton == null) {
    console.error("Save button is missing.");
} else {
    saveButton.addEventListener('click', Utils.copyToClipboard);
}
