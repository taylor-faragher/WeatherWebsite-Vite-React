export const capitalizeDescription = (text: string) => {
    return text.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });
};
