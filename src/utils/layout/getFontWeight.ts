const fontWeights: Record<string, number> = {
    feather: 300,
    base: 400,
    heavy: 700,
};

export const getFontWeight = (weight: string): number => {
    if (!weight) return 400;
    return fontWeights[weight]!;
};
