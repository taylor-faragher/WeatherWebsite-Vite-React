import {capitalizeWords} from '../utils/capitalizeWords';
import {FullImage, PremiumWeatherResults} from '../types/types';
import {formPictureObject} from './formPictureObject';
import {premiumDataMapper} from './premiumDataMapper';

jest.mock('../mappers/formPictureObject', () => ({
    formPictureObject: jest.fn(),
}));
jest.mock('../utils/capitalizeWords', () => ({
    capitalizeWords: jest.fn(),
}));
const mockFormPictureObject = formPictureObject as jest.MockedFunction<typeof formPictureObject>;

describe('premiumDataMapper', () => {
    it('should map data correctly', async () => {
        const mockData: PremiumWeatherResults = {
            coordinates: {
                lon: 1,
                lat: 1,
            },
            current: {
                icon: '01d',
                description: 'clear sky',
                temperature: 25,
                minTemperature: 20,
                maxTemperature: 30,
                summary: 'someWeather',
                sunrise: '5:00 am',
                sunset: '8:00 pm',
                pressure: 5,
                visibility: 5,
                humidity: 60,
                windSpeed: 10,
                windDirection: 320,
            },
            hourly: [
                {time: '10:00', temp: 20, icon: '10d', description: 'someWeather'},
                {time: '11:00', temp: 22, icon: '11d', description: 'newWeather'},
            ],
            daily: [
                {
                    day: 'Tuesday',
                    avgTemp: 25,
                    minTemp: 20,
                    maxTemp: 30,
                    icon: '9d',
                    description: 'moreWeather',
                    summary: 'thats some weather',
                    sunrise: '3:00am',
                    sunset: '5:00 pm',
                },
            ],
            area: {
                majorCity: 'Sample City',
                timezone: 'central',
            },
        };

        const mockImage: FullImage = {
            image: '/assets/01d.svg',
            imageAltText: 'Orange Sun',
        };
        (formPictureObject as jest.Mock).mockResolvedValue(mockImage);

        (capitalizeWords as jest.Mock).mockReturnValue('Clear Sky');

        const result = await premiumDataMapper(mockData);

        expect(result).toEqual({
            currentTemp: 25,
            humidity: 60,
            windSpeed: 10,
            windDirection: 320,
            description: 'Clear Sky',
            hourlyData: [
                {time: '10:00', temp: 20, icon: '10d', description: 'someWeather'},
                {time: '11:00', temp: 22, icon: '11d', description: 'newWeather'},
            ],
            image: {
                image: '/assets/01d.svg',
                imageAltText: 'Orange Sun',
            },
            majorCity: 'Sample City',
        });

        expect(mockFormPictureObject).toHaveBeenCalledWith('01d');
        (capitalizeWords as jest.Mock).mockReturnValue('Clear Sky');
    });

    it('should handle undefined fields gracefully', async () => {
        const mockData: PremiumWeatherResults = {
            coordinates: {
                lon: 1,
                lat: 1,
            },
            current: {
                icon: '01d',
                description: 'clear sky',
                temperature: undefined as unknown as number,
                minTemperature: undefined as unknown as number,
                maxTemperature: undefined as unknown as number,
                summary: undefined as unknown as string,
                sunrise: '5:00 am',
                sunset: '8:00 pm',
                pressure: 5,
                visibility: 5,
                humidity: 60,
                windSpeed: 10,
                windDirection: 320,
            },
            hourly: [
                {time: '10:00', temp: 20, icon: '10d', description: 'someWeather'},
                {time: '11:00', temp: 22, icon: '11d', description: 'newWeather'},
            ],
            daily: [
                {
                    day: 'Tuesday',
                    avgTemp: 25,
                    minTemp: 20,
                    maxTemp: 30,
                    icon: '9d',
                    description: 'moreWeather',
                    summary: 'thats some weather',
                    sunrise: '3:00am',
                    sunset: '5:00 pm',
                },
            ],
            area: {
                majorCity: 'Sample City',
                timezone: 'central',
            },
        };

        (formPictureObject as jest.Mock).mockResolvedValue({
            image: '/assets/01d.svg',
            imageAltText: 'Orange Sun',
        });

        (capitalizeWords as jest.Mock).mockReturnValue('Clear Sky');

        const result = await premiumDataMapper(mockData);

        expect(result).toEqual({
            currentTemp: undefined,
            humidity: 60,
            windSpeed: 10,
            windDirection: 320,
            description: 'Clear Sky',
            hourlyData: [
                {time: '10:00', temp: 20, icon: '10d', description: 'someWeather'},
                {time: '11:00', temp: 22, icon: '11d', description: 'newWeather'},
            ],
            image: {
                image: '/assets/01d.svg',
                imageAltText: 'Orange Sun',
            },
            majorCity: 'Sample City',
        });

        expect(mockFormPictureObject).toHaveBeenCalledWith('01d');
        (capitalizeWords as jest.Mock).mockReturnValue('Clear Sky');
    });
});
