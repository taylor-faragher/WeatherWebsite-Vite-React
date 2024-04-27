import {FullImage} from '../types/types';

export const getWeatherPic = (description: string): FullImage => {
    const map: Record<string, FullImage> = {
        'clear sky': {image: '01d.png', imageAltText: 'two string'},
        'few clouds': {image: '01d.png', imageAltText: 'two string'},
        'scattered clouds': {image: 'one string', imageAltText: 'two string'},
        'broken clouds': {image: 'one string', imageAltText: 'two string'},
        'shower rain': {image: 'one string', imageAltText: 'two string'},
        rain: {image: 'one string', imageAltText: 'two string'},
        thunderstorm: {image: 'one string', imageAltText: 'two string'},
        snow: {image: 'one string', imageAltText: 'two string'},
        mist: {image: 'one string', imageAltText: 'two string'},
    };
    return map[description];
};
