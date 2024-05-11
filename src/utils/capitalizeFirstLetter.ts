export const capitalizeFirstLetter = (text: string): string | void => {
    if (text) {
        return text.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
        });
    }
};
