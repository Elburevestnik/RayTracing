import { Subject } from "./Observable.js";

export class EditDialog {
    #inputRef = null;
    #closeSubject = new Subject();
    #parentId = '#overlayWrapper';
    #overlayNode = null;
    #elementRef = null;
    #template = '<div class="edit-modal__input-field">'
    + '<label class="edit-modal__label" for="editInput">'
    + 'edit name'
    + '</label>'
    + '<input id="editInput" class="edit-modal__input" type="text">'
    + '</div>'
    + '<button id="acceptEditBtn" type="button" role="button" class="action">'
    + '<img src="./assets/svg/accept-icon.svg" alt="Accept button">'
    + '</button>'
    + '<button id="closeEditBtn" type="button" role="button" class="action modal-close-btn">'
    + '<img src="./assets/svg/close.svg" alt="Close button">'
    + '</button>';


    constructor() {
        this.#overlayNode = document.querySelector(this.#parentId);
    }

    open() {
        this.#overlayNode.classList.remove('hidden');
        this.#overlayNode.classList.add('visible');
        this.#elementRef = document.createElement('div');
        this.#elementRef.className = 'edit-modal';
        this.#elementRef.innerHTML = this.#template;
        this.#overlayNode.appendChild(this.#elementRef);
        this.#inputRef = this.#overlayNode.querySelector('#editInput');
        const acceptEditBtnRef = this.#overlayNode.querySelector('#acceptEditBtn');
        const closeEditBtnRef = this.#overlayNode.querySelector('#closeEditBtn');
        const acceptEdit = () => {
            this.#close(this.#inputRef.value);
        };

        const cancelEdit = () => {
            this.#close();
        };

        acceptEditBtnRef.addEventListener('click', acceptEdit, {once: true});
        closeEditBtnRef.addEventListener('click', cancelEdit, {once: true});
    }

    #close(value = null) {
        this.#closeSubject.next(value);
        this.#elementRef.remove();
        this.#overlayNode.classList.remove('visible');
        this.#overlayNode.classList.add('hidden');
    }

    afterClose() {
        return this.#closeSubject;
    }
}