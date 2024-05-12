import {getFontSize} from './getFontSize';

describe('getFontSize utility', () => {
    test('returns correct font size for known size', () => {
        const size = 1;
        const result = getFontSize(size);
        expect(result).toBe('0.875rem');
    });

    test('returns default font size for unknown size', () => {
        const size = 13;
        const result = getFontSize(size);
        expect(result).toBe('');
    });

    test('returns default font size for size zero', () => {
        const size = 0;
        const result = getFontSize(size);
        expect(result).toBe('');
    });

    test('returns default font size for negative size', () => {
        const size = -1;
        const result = getFontSize(size);
        expect(result).toBe('');
    });

    test('returns default font size for undefined size', () => {
        const size = undefined;
        const result = getFontSize(size as unknown as number);
        expect(result).toBe('');
    });
});
