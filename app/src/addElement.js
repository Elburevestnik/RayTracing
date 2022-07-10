// const btn = document.querySelector('.theme-toggle');
const btnAddGroup = document.querySelector('#addGroup');
const groupContainer = document.querySelector('.grid-wrapper');
// const crazyKey = 'crazy';
const strictKey = 'strict';
//todo move common template to separated file
const sectionTemplate = 
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
    '<h2 id="sectionName"></h2>' +
    '<div id="elementWrapper" class="grid-card__element-wrapper"></div>';
const elementTemplate = 
    '<button id="elementTile" type="button" role="button" class="grid-card__element-tile"></button>' +
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

const themeImgList = {
    [crazyKey]: {
        high: '../assets/svg/star_fill.svg',
        mid: '../assets/svg/star_half.svg',
        low: '../assets/svg/star_half.svg',
        zero: '../assets/svg/star_empty.svg',
    },
    [strictKey]: {
        high: '../assets/svg/humidity_high.svg',
        mid: '../assets/svg/humidity_mid.svg',
        low: '../assets/svg/humidity_little-bit.svg',
        zero: '../assets/svg/humidity_low.svg',
    },
};
let selectedTheme;
//todo move constants to separated file

btn.addEventListener("click", () => {
    const chosenTheme = localStorage.getItem('chosenTheme');
    selectedTheme = chosenTheme.includes(crazyKey) ? themeImgList[crazyKey] : themeImgList[strictKey];
})
//todo keyboard listener
btnAddGroup.addEventListener('click', addGroup.bind(this, groupContainer, sectionTemplate));

function addGroup(groupContainer, sectionTemplate) {
    const section = document.createElement('section');
    const countOfCards = groupContainer.querySelectorAll('.grid-card').length;
    section.id = '#gridCardNo' + countOfCards;
    section.className = 'grid-card';
    section.innerHTML = sectionTemplate;
    openModalToEditGroupName(section);
    groupContainer.appendChild(section);
    const wrapper = groupContainer.querySelector('#elementWrapper');
    const removeListener$ = new Subject();
    const removeBtn = groupContainer.querySelector('#removeGroup');
    const _removeGroup = () => {
        removeGroup(section.id);
        removeBtn.removeEventListener('click', _removeGroup, false);
        removeListener$.next('removeListeners');
    }

    const _addElement = () => {
        addElement(wrapper, elementTemplate, removeListener$);
    };

    const _editGroup = () => {
        openModalToEditGroupName(section);
    };

    removeBtn.addEventListener('click', _removeGroup);
    const addBtn = groupContainer.querySelector('#addElement');
    addBtn.addEventListener('click', _addElement);
    const editBtn = groupContainer.querySelector('#editGroup');
    editBtn.addEventListener('click', _editGroup);

    removeListener$.subscribe((event) => {
        addBtn.removeEventListener('click', _addElement, false);
        editBtn.removeEventListener('click', _editGroup, false);
    });
}

function removeGroup(id) {
    alert('This functional is not ready yet, element with ' + id + 'will not be removed');
}

function addElement(groupContainer, elementTemplate, parentRemoveListener$) {
    const section = document.createElement('div');
    const countOfCards = groupContainer.querySelectorAll('.grid-card__element').length;
    section.id = '#gridCardElementNo' + countOfCards;
    section.className = 'grid-card__element';
    section.innerHTML = elementTemplate;
    openModalToEditGroupName(section);
    groupContainer.appendChild(section);
    const removeListener$ = new Subject();
    const removeBtn = groupContainer.querySelector('#removeElement');
    const _removeGroup = () => {
        removeGroup(section.id);
        removeBtn.removeEventListener('click', _removeGroup, false);
        removeListener$.next('removeChildListeners');
    }

    const _addElement = () => {
        alert('This functional is not ready yet');
    };

    const _editElement = () => {
        openModalToEditGroupName(section);
    };

    const _openModal = () => {
        openModalWithThemes();
    };

    const addBtn = groupContainer.querySelector('#addTheme');
    addBtn.addEventListener('click', _addElement);
    const editBtn = groupContainer.querySelector('#editElement');
    editBtn.addEventListener('click', _editElement);
    const tileBtn = groupContainer.querySelector('#elementTile');
    tileBtn.addEventListener('click', _openModal);

    const _removeListeners = () => {
        addBtn.removeEventListener('click', _addElement, false);
        editBtn.removeEventListener('click', _editElement, false);
        tileBtn.removeEventListener('click', _openModal, false);
    }
    removeListener$.subscribe((event) => {
        _removeListeners();
    });
    parentRemoveListener$.subscribe((event) => {
        _removeGroup();
    });
}
// const config = {
//     container,
//     template,
//     tagName,
//     id,
//     className,
//     removeBtnId,
//     editBtnId,
//     addBtnId,
//     removePromise,
//     childConfig,
//     infoBtnId,
//     openInfoFn,
// }

// function addEntity(config) {
//     console.log(config.container);
//     const element = document.createElement(config.tagName);
//     const countOfElements = groupContainer.querySelectorAll('.' + config.className).length;
//     element.id = '#' + config.id + countOfElements;
//     element.className = config.className;
//     element.innerHTML = config.template;
//     // this.openModalToEditElementName(section);
//     config.container.appendChild(element);
//     const removeBtn = config.container.querySelector(config.removeBtnId);
//     const addBtn = groupContainer.querySelector(config.addBtnId);
//     const editBtn = groupContainer.querySelector(config.edit.addBtnId);
    
//     const _removeElement = () => {
//         removeElement(section.id);
//         removeBtn.removeEventListener('click', _removeGroup, false);
//     };
//     const removePromise = new Promise((resolve, reject) => {
//         removeBtn.addEventListener('click', () => {
//             _removeElement();
//             resolve();
//         });
//     });

//     const _addEntity = () => {
//         addEntity({...config.childConfig, removePromise});
//     };
//     const _editEntity = () => {

//     }
//     removePromise.then(() => {

//     })
//     removeBtn.addEventListener('click', _removeElement);
    
//     addBtn.addEventListener('click', addEntity.bind(this, {}));
    
//     // editBtn.addEventListener('click', openModalToEditGroupName.bind(this, element));
//     if (infoBtnId && openInfoFn) {
//         const tileBtn = groupContainer.querySelector(infoBtnId);
//         // tileBtn.addEventListener('click', openInfoFn);
//     }
// }

function openModalToEditGroupName(groupNode) {
        //todo modal for input name
    console.log(groupNode);
}

function openModalWithThemes() {
    console.log(theme); 
}


