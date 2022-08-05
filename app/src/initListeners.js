import { Group } from "./Group.js";


export function initListeners() {
    const btn = document.querySelector('.theme-toggle');
    const btnAddGroup = document.querySelector('#addGroup');
    const groupContainer = document.querySelector('.grid-wrapper');
   
    //todo keyboard listener
    btnAddGroup.addEventListener('click', addGroup);

    function addGroup() {
        const group = new Group(groupContainer)
    }
}



