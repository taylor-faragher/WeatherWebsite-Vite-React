export const validateZipCodeLength = (zipCode: string): boolean => {
    if (!zipCode) return true;
    return zipCode.length < 5 || zipCode.length > 5;
};
