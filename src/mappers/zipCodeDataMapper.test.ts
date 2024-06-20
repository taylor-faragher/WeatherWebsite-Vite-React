import {capitalizeWords} from '../utils/capitalizeWords';
import {HourlyData, WeatherItem} from '../types/types';
import {mockData} from '../utils/testData/testData';
import {getPicAltText} from './getPicAltText';
import {mapZipCodeData} from './zipCodeDataMapper';

jest.mock('./getPicAltText', () => ({
    getPicAltText: jest.fn(),
}));

jest.mock('../utils/capitalizeWords', () => ({
    capitalizeWords: jest.fn(),
}));

describe('mapZipCodeData', () => {
    test('should return mapped WeatherItem when data is provided', async () => {
        const mockAltText = 'Rainy weather';
        const mockCapitalizedDescription = 'Light Rain';
        const mockHourlyData: HourlyData[] = [
            {
                time: '2:00 PM',
                temp: 88,
                icon: '01d',
                description: 'clear sky',
            },
        ];

        (getPicAltText as jest.Mock).mockResolvedValue(mockAltText);
        (capitalizeWords as jest.Mock).mockReturnValue(mockCapitalizedDescription);

        const expectedResult: WeatherItem = {
            currentTemp: 88,
            windSpeed: 10.36,
            humidity: 63,
            windDirection: 130,
            description: mockCapitalizedDescription,
            hourlyData: mockHourlyData,
            image: {
                image: '01d.svg',
                imageAltText: mockAltText,
            },
            majorCity: 'SomeCity',
        };

        const result = await mapZipCodeData(mockData);

        expect(getPicAltText).toHaveBeenCalledWith('01d');
        expect(capitalizeWords).toHaveBeenCalledWith('clear sky');
        expect(result).toEqual(expectedResult);
    });
});
