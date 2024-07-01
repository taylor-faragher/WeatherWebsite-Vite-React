import {PremiumWeatherItem, PremiumWeatherResults} from '../types/types';
import {capitalizeWords} from '../utils/capitalizeWords';
import {formPictureObject} from './formPictureObject';

export const premiumDataMapper = async (data: PremiumWeatherResults): Promise<PremiumWeatherItem> => {
    const weatherPic = await formPictureObject(data.current.icon);
    const description = await capitalizeWords(data.current.description);
    const hourlyData = data.hourly;
    const dailyData = data.daily;

    return {
        currentTemp: data?.current.temperature,
        humidity: data?.current.humidity,
        windSpeed: data?.current.windSpeed,
        windDirection: data?.current.windDirection,
        description: description,
        hourlyData: hourlyData,
        dailyData: dailyData,
        image: weatherPic,
        majorCity: data.area.majorCity,
    };
};
