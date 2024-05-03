export const validateZipCode = (zipCode: string): boolean => {
    return zipCode.length < 5 || zipCode.length > 5;
};
