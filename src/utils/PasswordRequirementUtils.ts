import {CharacterType} from 'src/types/types';

export const checkPasswordLength = (value): CharacterType => {
    if (!value) return 'none';
    return value.length >= 8 ? 'correct' : 'incorrect';
};

export const checkPasswordForNumber = (value): CharacterType => {
    if (!value) return 'none';
    const numberRegEx = /\d/;
    return numberRegEx.test(value) ? 'correct' : 'incorrect';
};

export const checkPasswordForUpperCase = (value): CharacterType => {
    if (!value) return 'none';
    const uppercaseRegEx = /[A-Z]/;
    return uppercaseRegEx.test(value) ? 'correct' : 'incorrect';
};

export const checkPasswordForSpecialCharacter = (value): CharacterType => {
    if (!value) return 'none';
    const specialCharacterRegEx = /[!@#$%^&*(),.?":{}|<>_\-\[\]\\\/+=~`]/;
    return specialCharacterRegEx.test(value) ? 'correct' : 'incorrect';
};
