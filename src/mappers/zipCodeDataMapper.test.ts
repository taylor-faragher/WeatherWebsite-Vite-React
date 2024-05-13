import {WeatherResults} from '../types/types';
import {mockData, incompleteMockData} from './testData/testData';
import {mapZipCodeData} from './zipCodeDataMapper';

describe('mapZipCodeData', () => {
    test('should return undefined when data is undefined', () => {
        const result = mapZipCodeData(undefined as unknown as WeatherResults);
        expect(result).toBeUndefined();
    });

    test('should return mapped WeatherItem when data is provided', () => {
        const result = mapZipCodeData(mockData);

        expect(result).toEqual({
            currentTemp: 59.76,
            windSpeed: 5.75,
            description: 'OvercastClouds',
            majorCity: 'TownUSA',
            image: {
                image: '04d.png',
                imageAltText: 'white cloud with moon behind it',
            },
        });
    });

    test('should return mapped WeatherItem with default values when data is incomplete', () => {
        const result = mapZipCodeData(incompleteMockData as WeatherResults);

        expect(result).toEqual({
            currentTemp: undefined,
            windSpeed: undefined,
            description: 'ClearSky',
            majorCity: 'London',
            image: {
                image: '01d.png',
                imageAltText: 'Orange Sun',
            },
        });
    });
});
