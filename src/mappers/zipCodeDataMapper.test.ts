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
            currentTemp: 88,
            windSpeed: 10.36,
            humidity: 63,
            windDirection: 130,
            description: mockPascalizedDescription,
            image: {
                image: '01d.svg',
                imageAltText: mockAltText,
            },
        };

        const result = await mapZipCodeData(mockData);

        expect(getPicAltText).toHaveBeenCalledWith('01d');
        expect(pascalize).toHaveBeenCalledWith('clear sky');
        expect(result).toEqual(expectedResult);
    });
});
