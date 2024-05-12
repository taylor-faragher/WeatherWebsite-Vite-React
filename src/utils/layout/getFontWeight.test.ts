import {getFontWeight} from './getFontWeight';

describe('getFontWeight utility', () => {
    test('returns correct font weight for known weight', () => {
        const weight = 'feather';
        const result = getFontWeight(weight);
        expect(result).toBe(300);
    });

    test('returns default font weight for unknown weight', () => {
        const weight = 'unknown';
        const result = getFontWeight(weight);
        expect(result).toBe(400);
    });

    test('returns default font weight for empty weight', () => {
        const weight = '';
        const result = getFontWeight(weight);
        expect(result).toBe(400);
    });

    test('returns default font weight for undefined weight', () => {
        const weight = undefined;
        const result = getFontWeight(weight as unknown as string);
        expect(result).toBe(400);
    });
});
