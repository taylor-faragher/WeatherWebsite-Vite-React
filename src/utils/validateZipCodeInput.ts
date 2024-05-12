export const validateZipCodeInput = event => {
    const nondigit = /[^\d]/g;
    return event.target.value.replace(nondigit, '');
};
