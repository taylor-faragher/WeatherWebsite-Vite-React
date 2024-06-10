import {pascalize} from '../utils/pascalize';
import {WeatherItem} from '../types/types';
import {mockData} from '../utils/testData/testData';
import {getPicAltText} from './getPicAltText';
import {mapZipCodeData} from './zipCodeDataMapper';

jest.mock('./getPicAltText', () => ({
    getPicAltText: jest.fn(),
}));

jest.mock('../utils/pascalize', () => ({
    pascalize: jest.fn(),
}));

describe('mapZipCodeData', () => {
    test('should return mapped WeatherItem when data is provided', async () => {
        const mockAltText = 'Rainy weather';
        const mockPascalizedDescription = 'Light Rain';

        (getPicAltText as jest.Mock).mockResolvedValue(mockAltText);
        (pascalize as jest.Mock).mockReturnValue(mockPascalizedDescription);

        const expectedResult: WeatherItem = {
            currentTemp: 59.76,
            windSpeed: 5.75,
            feelsLike: 59,
            humidity: 100,
            windDirection: 360,
            description: mockPascalizedDescription,
            majorCity: 'TownUSA',
            image: {
                image: '04d.svg',
                imageAltText: mockAltText,
            },
        };

        const result = await mapZipCodeData(mockData);

        expect(getPicAltText).toHaveBeenCalledWith('i2d');
        expect(pascalize).toHaveBeenCalledWith('overcast clouds');
        expect(result).toEqual(expectedResult);
    });
});
