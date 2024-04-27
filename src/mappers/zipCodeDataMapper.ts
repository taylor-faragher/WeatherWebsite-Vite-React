import {WeatherItem, WeatherResults} from '../types/types';
import {getWeatherPic} from './getWeatherPic';

export const mapZipCodeData = (data: WeatherResults): WeatherItem | undefined => {
    if (!data) {
        return;
    }
    const weatherPic = getWeatherPic(data.weather[0].description);

    return {
        currentTemp: data?.main.temp,
        windSpeed: data?.wind.speed as number,
        description: data.weather[0].description as string,
        majorCity: data.name as string,
        image: weatherPic,
    };
};
