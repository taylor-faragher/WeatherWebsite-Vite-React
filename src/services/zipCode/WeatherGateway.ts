import {WeatherMethods, WeatherResults} from '../../types/types';

export const fetchWeather = async (method: string, zipCode?: string): Promise<WeatherResults> => {
    let url = '';
    if (method == WeatherMethods.zipCode) {
        url = `https://api.taylorsweatherapi.com/?zipcode=${zipCode}`;
    }

    if (method == WeatherMethods.cityLookup) {
        url = `https://api.taylorsweatherapi.com/`;
    }

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    const response: Response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(JSON.stringify(data.message));
    }

    return data;
};
