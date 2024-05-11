import {WeatherItem, WeatherResults} from '../types/types';
import {capitalizeFirstLetter} from '../utils/capitalizeFirstLetter';
import {getPicAltText} from './getPicAltText';

export const mapZipCodeData = (data: WeatherResults): WeatherItem | undefined => {
    if (!data) {
        return;
    }
    const picName = data.weather[0].icon;
    const weatherPic = {image: `${picName}.png`, imageAltText: getPicAltText(picName)};
    const description = capitalizeFirstLetter(data.weather[0].description as string);

    return {
        currentTemp: data?.main.temp,
        windSpeed: data?.wind.speed as number,
        description: description as string,
        majorCity: data.name as string,
        image: weatherPic,
    };
};
