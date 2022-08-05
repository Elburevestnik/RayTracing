import { BehaviorSubject } from "./Observable.js";

export const crazyKey = 'crazy';
export const strictKey = 'strict';
export const themeImgList = {
    [crazyKey]: {
        high: {
            src: '../assets/svg/star_fill.svg',
            alt: '100% progress icon',
        },
        mid: {
            src:'../assets/svg/star_half.svg',
            alt: 'A litle bit progress icon',
        },
        low: {
            src:'../assets/svg/star_half.svg',
            alt: 'A litle bit progress icon',
        },
        zero: {
            src: '../assets/svg/star_empty.svg',
            alt: 'Null progress icon',
        },
    },
    [strictKey]: {
        high: {
            src: '../assets/svg/humidity_high.svg',
            alt: '100% progress icon',
        },
        mid: {
            src: '../assets/svg/humidity_mid.svg',
            alt: 'A litle bit progress icon',
        },
        low: {
            src: '../assets/svg/humidity_little-bit.svg',
            alt: 'A litle bit progress icon',
        },
        zero: {
            src: '../assets/svg/humidity_low.svg',
            alt: 'Null progress icon',
        },
    },
};
export const selectedTheme$ = new BehaviorSubject(!localStorage.getItem('chosenTheme') || localStorage.getItem('chosenTheme').includes(crazyKey) ? themeImgList[crazyKey] : themeImgList[strictKey]);

export function listenThemeSelection() {
    let chosenTheme = localStorage.getItem('chosenTheme');
    const crazyTheme = './styles/crazy-theme-variables.css';
    const strictTheme = './styles/strict-theme-variables.css';
    const crazyThemeModifier = 'theme-toggle_theme-crazy';
    const strictThemeModifier = 'theme-toggle_theme-strict';
    const btn = document.querySelector('.theme-toggle');
    const theme = document.querySelector('#theme-link');
    let themeFile = theme.getAttribute('href');
    if (chosenTheme && !themeFile.includes(chosenTheme)) {
        theme.href = chosenTheme;
        const modifier = chosenTheme.includes(crazyKey) ? crazyThemeModifier : strictThemeModifier;
        const removedModifier = chosenTheme.includes(crazyKey) ? strictThemeModifier : crazyThemeModifier;
        btn.classList.remove(removedModifier);
        btn.classList.add(modifier);
    }

    const changeTheme = (themeFile, modifier, removedModifier) => {
        theme.href = themeFile;
        localStorage.setItem('chosenTheme', themeFile);
        chosenTheme = localStorage.getItem('chosenTheme');
        selectedTheme$.next(chosenTheme.includes(crazyKey) ? themeImgList[crazyKey] : themeImgList[strictKey]);
        btn.classList.remove(removedModifier);
        btn.classList.add(modifier);
    }

    btn.addEventListener("click", () => {
        themeFile.includes(crazyKey)
            ? changeTheme (strictTheme, strictThemeModifier, crazyThemeModifier)
            : changeTheme (crazyTheme, crazyThemeModifier, strictThemeModifier);
        themeFile = chosenTheme;
    })
}
