import {pascalize} from './pascalize';

describe('pascalize tests::', () => {
    test('Pascalize method should pascalize the string passed to it', () => {
        const unpascalizedString = '/choose-device';
        const expectedOutput = 'ChooseDevice';
        const actualOutput = pascalize(unpascalizedString);
        expect(actualOutput).toEqual(expectedOutput);
    });

    test('Pascalize method should return empty string if input value is null', () => {
        const unpascalizedString = null;
        const expectedOutput = '';
        const actualOutput = pascalize(unpascalizedString as unknown as string);
        expect(actualOutput).toEqual(expectedOutput);
    });

    test('Pascalize method should return empty string if input value is undefined', () => {
        const unpascalizedString = undefined;
        const expectedOutput = '';
        const actualOutput = pascalize(unpascalizedString as unknown as string);
        expect(actualOutput).toEqual(expectedOutput);
    });
});
