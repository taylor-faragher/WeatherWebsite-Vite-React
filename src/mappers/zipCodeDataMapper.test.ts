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
            currentTemp: 59,
            windSpeed: 10,
            feelsLike: 59,
            humidity: 100,
            windDirection: 360,
            description: mockPascalizedDescription,
            majorCity: 'Smyrna',
            image: {
                image: 'i2d.svg',
                imageAltText: mockAltText,
            },
        };

        const result = await mapZipCodeData(mockData);

        expect(getPicAltText).toHaveBeenCalledWith('i2d');
        expect(pascalize).toHaveBeenCalledWith('windy');
        expect(result).toEqual(expectedResult);
    });
});
