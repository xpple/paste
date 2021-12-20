import {Utils} from "./modules/Utils.js";


export const textArea: HTMLTextAreaElement | null = document.querySelector("#text-editor");
window.addEventListener("load", () => Utils.pasteToTextArea());

const saveButton: HTMLLinkElement | null = document.querySelector("#save");
if (saveButton == undefined) {
    console.error("Save button is missing.");
} else {
    saveButton.onclick = () => Utils.copyToClipboard();
}
