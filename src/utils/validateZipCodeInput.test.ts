import {validateZipCodeInput} from './validateZipCodeInput';

describe('ValidateZipCodeInput utility', () => {
    test('removes non-digit characters from the input', () => {
        const event = {target: {value: '123abc456!@#789'}};
        const result = validateZipCodeInput(event);
        expect(result).toBe('123456789');
    });

    test('handles empty input', () => {
        const event = {target: {value: ''}};
        const result = validateZipCodeInput(event);
        expect(result).toBe('');
    });

    test('handles input with only non-digit characters', () => {
        const event = {target: {value: '!@#$%^&*()'}};
        const result = validateZipCodeInput(event);
        expect(result).toBe('');
    });

    test('does not modify input with only digit characters', () => {
        const event = {target: {value: '1234567890'}};
        const result = validateZipCodeInput(event);
        expect(result).toBe('1234567890');
    });
});
