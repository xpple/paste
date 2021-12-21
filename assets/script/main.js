import { Utils } from "./modules/Utils.js";
export const textArea = document.querySelector("#text-editor");
window.addEventListener("load", () => Utils.pasteToTextArea());
const saveButton = document.querySelector("#save");
if (saveButton == null) {
    console.error("Save button is missing.");
}
else {
    saveButton.onclick = () => Utils.copyToClipboard(false);
}
const compressSaveButton = document.querySelector("#compress-save");
if (compressSaveButton == null) {
    console.error("Compress save button is missing.");
}
else {
    compressSaveButton.onclick = () => Utils.copyToClipboard(true);
}
