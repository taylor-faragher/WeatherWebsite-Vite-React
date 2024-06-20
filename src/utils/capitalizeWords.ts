export const capitalizeWords = (inputString: string): string => {
    if (!inputString) return '';
    return inputString
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};
