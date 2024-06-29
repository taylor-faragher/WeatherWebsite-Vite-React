import {FreemiumWeatherItem} from 'src/types/types';
import {freemiumDataMapper} from '../mappers/freemiumDataMapper';

export const fetchFreemiumWeather = async (zipCode: string): Promise<FreemiumWeatherItem> => {
    if (!zipCode) {
        return Promise.reject(new Error('Bad Request'));
    }

    const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-api-key': 'uFaywcvpQj94HeeNC8ESd3w5eSS8NcxKaILjvkVq',
    };
    const response: Response = await fetch(`https://dev.taylorsweatherapi.com/?zipcode=${zipCode}`, {headers: headers});
    const data = await response.json();

    if (!response.ok) {
        throw new Error(JSON.stringify(data.message));
    }
    const mappedData: FreemiumWeatherItem = await freemiumDataMapper(data);

    return mappedData;
};
