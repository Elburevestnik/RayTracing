let chosenTheme = localStorage.getItem('chosenTheme');
const crazyKey = 'crazy';
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
    btn.classList.remove(removedModifier);
    btn.classList.add(modifier);
}

btn.addEventListener("click", () => {
    themeFile.includes(crazyKey)
        ? changeTheme (strictTheme, strictThemeModifier, crazyThemeModifier)
        : changeTheme (crazyTheme, crazyThemeModifier, strictThemeModifier);
    themeFile = chosenTheme;
})

