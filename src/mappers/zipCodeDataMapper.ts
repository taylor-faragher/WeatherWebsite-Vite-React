import {WeatherItem, WeatherResults} from '../types/types';

export const mapZipCodeData = (data: WeatherResults): WeatherItem | undefined => {
    if (!data) {
        return;
    }

    return {
        currentTemp: data?.main.temp,
        windSpeed: data?.wind.speed as number,
        description: data.weather.description as string,
        majorCity: data.name as string,
    };
};
