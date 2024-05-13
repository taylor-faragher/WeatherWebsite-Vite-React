import {getPicAltText} from './getPicAltText';

describe('getPicAltText', () => {
    test('should return undefined when pic is undefined', () => {
        const result = getPicAltText(undefined as unknown as string);
        expect(result).toBe(undefined);
    });

    test('should return correct alt text for valid picture code', () => {
        const result = getPicAltText('01d');
        expect(result).toBe('Orange Sun');
    });

    test('should return undefined for invalid picture code', () => {
        const result = getPicAltText('invalid');
        expect(result).toBe(undefined);
    });
});
