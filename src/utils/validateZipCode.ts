import {ChangeEvent} from 'react';

export const validateZipCode = (event: ChangeEvent<HTMLInputElement>) => {
    const nondigit = /[^\d]/g;
    return event.target.value.replace(nondigit, '');
};
