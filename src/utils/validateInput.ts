import {ChangeEvent} from 'react';

export const validateInput = (event: ChangeEvent<HTMLInputElement>) => {
    const nondigit = /[^\d]/g;
    return event.target.value.replace(nondigit, '');
};
