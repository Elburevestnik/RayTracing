import { EditDialog } from "./EditDialog.js";
import { Subject } from "./Observable.js";
import { Section } from "./Section.js";

export class Group {
    #parentNode = null;
    #elementName = '';
    #elementRef = null;
    #template = 
    '<div class="grid-card__actions grid-card__actions_type-section">' +
    '<button id="addElement" type="button" role="button" class="action">' +
    '<img src="./assets/svg/add_circle.svg" alt="Add topic button" />' +
    '</button>' +
    '<button id="removeGroup" type="button" role="button" class="action">' +
    '<img src="./assets/svg/delete.svg" alt="Remove topic button" />' +
    '</button>' +
    '<button id="editGroup" type="button" role="button" class="action">' +
    '<img src="./assets/svg/edit.svg" alt="Edit topic button" />' +
    '</button>' +
    '</div>' +
    '<h2 class="grid-card__name" id="groupName"></h2>' +
    '<div id="elementWrapper" class="grid-card__element-wrapper"></div>';

    constructor(parentNode) {
        this.#parentNode = parentNode;
        this.#openModalToEditName();
    }

    #createElement() {
        this.#elementRef = document.createElement('section');
        const countOfCards = this.#parentNode.querySelectorAll('.grid-card').length;
        this.#elementRef.id = '#gridCardNo' + countOfCards;
        this.#elementRef.className = 'grid-card';
        this.#elementRef.innerHTML = this.#template;
        this.#setName();
        this.#parentNode.appendChild(this.#elementRef);
        const wrapper = this.#parentNode.querySelector('#elementWrapper');
        const removeListener$ = new Subject();
        const removeBtn = this.#parentNode.querySelector('#removeGroup');
        const _removeGroup = () => {
            this.#removeGroup();
            removeListener$.next();
        }

        const _addElement = () => {
            const section = new Section(wrapper, removeListener$);
        };

        const _editGroup = () => {
            this.#openModalToEditName(true);
        };

        removeBtn.addEventListener('click', _removeGroup, {once: true});
        const addBtn = this.#parentNode.querySelector('#addElement');
        addBtn.addEventListener('click', _addElement);
        const editBtn = this.#parentNode.querySelector('#editGroup');
        editBtn.addEventListener('click', _editGroup);

        removeListener$.subscribe((event) => {
            addBtn.removeEventListener('click', _addElement, false);
            editBtn.removeEventListener('click', _editGroup, false);
        });
    }

    #removeGroup() {
        this.#elementRef.remove();
    }
    
    #openModalToEditName(isEditMode) {
        const editDialog = new EditDialog();
        editDialog.open();
        editDialog.afterClose()
            .subscribe((value) => {
                if (value) {
                    this.#elementName = value.toLowerCase();
                    isEditMode ? this.#setName() : this.#createElement();
                }
            });
    }

    #setName() {
        this.#elementRef.querySelector('#groupName').innerHTML = this.#elementName;
    }
}