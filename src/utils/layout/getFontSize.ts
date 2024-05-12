const fontSizes: Record<number, string> = {
    0: '0.75rem',
    1: '0.875rem',
    2: '1rem',
    3: '1.25rem',
    4: '1.5rem',
    5: '2rem',
    6: '2.5rem',
    7: '3rem',
    8: '3.75rem',
    9: '4.50rem',
    10: '6rem',
    11: '7rem',
    12: '10rem',
};

export const getFontSize = (size: number): string => {
    if (!size) return '';
    return fontSizes[size]!;
};
