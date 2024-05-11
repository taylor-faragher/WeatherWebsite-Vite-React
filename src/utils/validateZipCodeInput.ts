import {ChangeEvent} from 'react';

export const validateZipCodeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const nondigit = /[^\d]/g;
    return event.target.value.replace(nondigit, '');
};
