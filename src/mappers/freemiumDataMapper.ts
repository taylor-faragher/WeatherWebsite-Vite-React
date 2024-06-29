import {FreemiumWeatherItem, FreemiumWeatherResults} from '../types/types';
import {capitalizeWords} from '../utils/capitalizeWords';
import {formPictureObject} from './formPictureObject';

export const freemiumDataMapper = async (data: FreemiumWeatherResults): Promise<FreemiumWeatherItem> => {
    const weatherPic = await formPictureObject(data.current.icon);
    const description = await capitalizeWords(data.current.description);

    return {
        currentTemp: data?.current.temperature,
        description: description,
        image: weatherPic,
    };
};
