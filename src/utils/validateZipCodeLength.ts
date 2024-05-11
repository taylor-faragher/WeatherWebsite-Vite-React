export const validateZipCodeLength = (zipCode: string): boolean => {
    return zipCode.length < 5 || zipCode.length > 5;
};
