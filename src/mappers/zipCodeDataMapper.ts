import {WeatherItem, WeatherResults} from '../types/types';
import {pascalize} from '../utils/pascalize';
import {getPicAltText} from './getPicAltText';

export const mapZipCodeData = async (data: WeatherResults): Promise<WeatherItem> => {
    const picName = data.current.icon;
    const weatherPic = {image: `${picName}.svg`, imageAltText: await getPicAltText(picName)};
    const description = await pascalize(data.current.description);

    return {
        currentTemp: data?.current.temperature,
        humidity: data?.current.humidity,
        windSpeed: data?.current.windSpeed,
        windDirection: data?.current.windDirection,
        description: description,
        image: weatherPic,
    };
};
