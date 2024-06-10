import {WeatherItem, WeatherResults} from '../types/types';
import {pascalize} from '../utils/pascalize';
import {getPicAltText} from './getPicAltText';

export const mapZipCodeData = async (data: WeatherResults): Promise<WeatherItem> => {
    const picName = data.weather.icon;
    const weatherPic = {image: `${picName}.svg`, imageAltText: await getPicAltText(picName)};
    const description = await pascalize(data.weather.description);

    return {
        currentTemp: data?.weather.temperature,
        feelsLike: data?.weather.feelsLike,
        humidity: data?.weather.humidity,
        windSpeed: data?.weather.windSpeed,
        windDirection: data?.weather.windDirection,
        description: description,
        majorCity: data?.area.majorCity,
        image: weatherPic,
    };
};
