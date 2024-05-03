import {WeatherItem, WeatherResults} from '../types/types';
import {getPicAltText} from './getPicAltText';

export const mapZipCodeData = (data: WeatherResults): WeatherItem | undefined => {
    if (!data) {
        return;
    }
    const picName = data.weather[0].icon;
    const weatherPic = {image: `${picName}.png`, imageAltText: getPicAltText(picName)};

    return {
        currentTemp: data?.main.temp,
        windSpeed: data?.wind.speed as number,
        description: data.weather[0].description as string,
        majorCity: data.name as string,
        image: weatherPic,
    };
};
