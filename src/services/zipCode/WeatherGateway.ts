import {WeatherItem} from 'src/types/types';
import {mapZipCodeData} from '../../mappers/zipCodeDataMapper';

export const fetchWeather = async (zipCode: string): Promise<WeatherItem> => {
    if (!zipCode) {
        return Promise.reject(new Error('Bad Request'));
    }

    const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-api-key': 'bTK3tM6Zwj8cHACQtSRH26aEFwzeQ4ns9YInqoj5',
    };
    const response: Response = await fetch(`https://api.taylorsweatherapi.com/?zipcode=${zipCode}`, {headers: headers});
    const data = await response.json();

    if (!response.ok) {
        throw new Error(JSON.stringify(data.message));
    }
    const mappedData = await mapZipCodeData(data);

    return mappedData;
};
