import {WeatherItem, WeatherResults} from '../types/types';
import {pascalize} from '../utils/pascalize';
import {getPicAltText} from './getPicAltText';

export const mapZipCodeData = async (data: WeatherResults): Promise<WeatherItem> => {
    const picName = data.weather[0].icon;
    const weatherPic = {image: `${picName}.svg`, imageAltText: await getPicAltText(picName)};
    const description = pascalize(data.weather[0].description);

    return {
        currentTemp: data?.main?.temp,
        windSpeed: data?.wind?.speed,
        description: description,
        majorCity: data.name,
        image: weatherPic,
    };
};
