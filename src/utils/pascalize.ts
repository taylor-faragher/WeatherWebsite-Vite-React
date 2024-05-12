export const pascalize = (inputString: string): string => {
    return inputString.replace(/(?:^\w|\b\w|\s+|-|\/)/g, match =>
        +match === 0 || ['-', '/'].includes(match) ? '' : match.toUpperCase()
    );
};
