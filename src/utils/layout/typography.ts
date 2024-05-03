const fontWeights: Record<string, number> = {
    feather: 300,
    base: 400,
    heavy: 700,
};

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
};

export const getFontWeight = (weight: string): number => {
    return fontWeights[weight];
};
export const getFontSize = (size: number): string => {
    return fontSizes[size];
};
