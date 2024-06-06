import {mapZipCodeData} from '../../mappers/zipCodeDataMapper';

export const fetchWeather = async (zipCode: string) => {
    if (!zipCode) {
        return Promise.reject(new Error('Bad Request'));
    }

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    const response: Response = await fetch(`https://api.taylorsweatherapi.com/?zipcode=${zipCode}`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(JSON.stringify(data.message));
    }
    const mappedData = await mapZipCodeData(data);

    return mappedData;
};
