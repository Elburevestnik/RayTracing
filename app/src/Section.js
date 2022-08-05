import { EditDialog } from "./EditDialog.js";
import { selectedTheme$ } from "./listenThemeSelection.js";
import { Subject } from "./Observable.js";

export class Section {
    #parentNode = null;
    #removeListener$ = null;
    #elementName = '';
    #template = 
    '<button id="elementTile" type="button" role="button" '+
    'class="grid-card__element-tile grid-card__element-tile_status-default">'+
    '<img/>'+
    '<span></span>'+
    '</button>' +
    '<div class="grid-card__actions grid-card__actions_type-element">' +
    '<button id="addTheme" type="button" role="button" class="action">' +
    '<img src="./assets/svg/add_circle.svg" alt="Add sourse button"/>' +
    '</button>' +
    '<button id="removeElement" type="button" role="button" class="action">' +
    '<img src="./assets/svg/delete.svg" alt="Remove source button"/>' +
    '</button>' +
    '<button id="editElement" type="button" role="button" class="action">' +
    '<img src="./assets/svg/edit.svg" alt="Edit source button"/>' +
    '</button>' +
    '</div>';
    #elementRef = null;
    #selectedTheme = null;
    #knowledgeLevel = 'zero';

    constructor(parentNode, removeListener$) {
        this.#parentNode = parentNode;
        this.#removeListener$ = removeListener$;
        this.#selectedTheme = selectedTheme$.value;
        this.#openModalToEditName();
    }

    #createElement() {
        this.#elementRef = document.createElement('div');
        const countOfCards = this.#parentNode.querySelectorAll('.grid-card__element').length;
        this.#elementRef.id = '#gridCardElementNo' + countOfCards;
        this.#elementRef.className = 'grid-card__element';
        this.#elementRef.innerHTML = this.#template;
        this.#setNameAndIcon();
        this.#parentNode.appendChild(this.#elementRef);
        const removeListener$ = new Subject();
        const removeBtn = this.#parentNode.querySelector('#removeElement');
        const _removeSection = () => {
            this.#removeSection();
            removeListener$.next();
        }

        const _addElement = () => {
            alert('This functional is not ready yet');
        };

        const _editElement = () => {
            this.#openModalToEditName(true);
        };

        const _openModal = () => {
            alert('This functional is not ready yet');
        };

        removeBtn.addEventListener('click', _removeSection, {once: true});
        const addBtn = this.#parentNode.querySelector('#addTheme');
        addBtn.addEventListener('click', _addElement);
        const editBtn = this.#parentNode.querySelector('#editElement');
        editBtn.addEventListener('click', _editElement);
        const tileBtn = this.#parentNode.querySelector('#elementTile');
        tileBtn.addEventListener('click', _openModal);

        const _removeListeners = () => {
            addBtn.removeEventListener('click', _addElement);
            editBtn.removeEventListener('click', _editElement);
            tileBtn.removeEventListener('click', _openModal);
        }

        removeListener$.subscribe((event) => {
            _removeListeners();
        });
        
        this.#removeListener$.subscribe((event) => {
            _removeGroup();
        });

        selectedTheme$.subscribe((selectedTheme) => {
            this.#selectedTheme = selectedTheme;
            this.#setIcon(this.#knowledgeLevel);
        })
    }

    #removeSection() {
        this.#elementRef.remove();
    }

    #openModalToEditName(isEditMode) {
        const editDialog = new EditDialog();
        editDialog.open();
        editDialog.afterClose()
            .subscribe((value) => {
                if (value) {
                    this.#elementName = value.toLowerCase();
                    isEditMode ? this.#setNameAndIcon(this.#knowledgeLevel) : this.#createElement();
                }
            });
    }

    #setNameAndIcon(iconLevel) {
        this.#setName();
        this.#setIcon(iconLevel);
    }

    #setName() {
        this.#elementRef.querySelector('span').innerHTML = this.#elementName;
    }

    #setIcon(iconLevel = 'zero') {
        const img = this.#elementRef.querySelector('img');
        img.setAttribute('src', this.#selectedTheme[iconLevel].src);
        img.setAttribute('alt', this.#selectedTheme[iconLevel].alt);
    }
}