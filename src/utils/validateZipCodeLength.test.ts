import {validateZipCodeLength} from './validateZipCodeLength';

describe('ValidateZipCodeLength utility', () => {
    test('returns true if zip code length is less than 5', () => {
        const zipCode = '1234';
        const result = validateZipCodeLength(zipCode);
        expect(result).toBe(true);
    });

    test('returns true if zip code length is greater than 5', () => {
        const zipCode = '123456';
        const result = validateZipCodeLength(zipCode);
        expect(result).toBe(true);
    });

    test('returns false if zip code length is exactly 5', () => {
        const zipCode = '12345';
        const result = validateZipCodeLength(zipCode);
        expect(result).toBe(false);
    });

    test('handles empty input', () => {
        const zipCode = '';
        const result = validateZipCodeLength(zipCode);
        expect(result).toBe(true);
    });

    test('handles non-string input', () => {
        const zipCode = null;
        const result = validateZipCodeLength(zipCode as unknown as string);
        expect(result).toBe(true);
    });
});
