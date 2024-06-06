import {WeatherItem, WeatherResults} from '../types/types';
import {pascalize} from '../utils/pascalize';
import {getPicAltText} from './getPicAltText';

export const mapZipCodeData = async (data: WeatherResults): Promise<WeatherItem | undefined> => {
    if (!data) {
        return;
    }
    const picName = data.weather[0].icon;
    const weatherPic = {image: `${picName}.svg`, imageAltText: await getPicAltText(picName)};
    const description = pascalize(data.weather[0].description);

    return {
        currentTemp: data?.main?.temp,
        windSpeed: data?.wind?.speed as number,
        description: description,
        majorCity: data.name as string,
        image: weatherPic,
    };
};
