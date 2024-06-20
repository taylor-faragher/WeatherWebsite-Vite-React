import {capitalizeWords} from './capitalizeWords';

describe('Capitalize Words tests::', () => {
    test('Capitalize Words method should capitalize the string passed to it', () => {
        const plainString = 'scattered clouds';
        const expectedOutput = 'Scattered Clouds';
        const actualOutput = capitalizeWords(plainString);
        expect(actualOutput).toEqual(expectedOutput);
    });

    test('Capitalize Words method should capitalize the string passed to it', () => {
        const plainString = 'scattered clouds';
        const expectedOutput = 'Scattered Clouds';
        const actualOutput = capitalizeWords(plainString);
        expect(actualOutput).toEqual(expectedOutput);
    });

    test('Capitalize Words method should return empty string if input value is null', () => {
        const plainString = null;
        const expectedOutput = '';
        const actualOutput = capitalizeWords(plainString as unknown as string);
        expect(actualOutput).toEqual(expectedOutput);
    });

    test('Capitalize Words method should return empty string if input value is undefined', () => {
        const plainString = undefined;
        const expectedOutput = '';
        const actualOutput = capitalizeWords(plainString as unknown as string);
        expect(actualOutput).toEqual(expectedOutput);
    });
});
