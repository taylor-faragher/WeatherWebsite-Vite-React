import {WeatherItem, WeatherResults} from '../types/types';
import {capitalizeWords} from '../utils/capitalizeWords';
import {getPicAltText} from './getPicAltText';

export const mapZipCodeData = async (data: WeatherResults): Promise<WeatherItem> => {
    const picName = data.current.icon;
    const weatherPic = {image: `${picName}.svg`, imageAltText: await getPicAltText(picName)};
    const description = await capitalizeWords(data.current.description);
    const hourlyData = data.hourly;

    return {
        currentTemp: data?.current.temperature,
        humidity: data?.current.humidity,
        windSpeed: data?.current.windSpeed,
        windDirection: data?.current.windDirection,
        description: description,
        hourlyData: hourlyData,
        image: weatherPic,
        majorCity: data.area.majorCity,
    };
};
