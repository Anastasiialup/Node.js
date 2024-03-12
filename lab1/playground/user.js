const fs = require('fs');
const _ = require('lodash');

const getUserData = () => {
    const rawData = fs.readFileSync('user.json');
    return JSON.parse(rawData);
};

const saveUserData = (data) => {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync('user.json', jsonData);
};

const addLanguage = (title, level) => {
    const userData = getUserData();
    const newLanguage = { title, level };
    userData.languages.push(newLanguage);
    saveUserData(userData);
    console.log(`Language added: ${title}, Level: ${level}`);
};

const viewLanguages = () => {
    const userData = getUserData();
    const languages = userData.languages;
    console.log('Languages:', languages);
};

const removeLanguage = (title) => {
    const userData = getUserData();
    const indexToRemove = _.findIndex(userData.languages, { title });
    if (indexToRemove !== -1) {
        userData.languages.splice(indexToRemove, 1);
        saveUserData(userData);
        console.log(`Language removed: ${title}`);
    } else {
        console.log(`Language not found: ${title}`);
    }
};

module.exports = {
    addLanguage,
    viewLanguages,
    removeLanguage,
};
