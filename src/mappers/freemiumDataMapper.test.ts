import {freemiumDataMapper} from './freemiumDataMapper';
import {FreemiumWeatherItem, FreemiumWeatherResults} from '../types/types';
import {capitalizeWords} from '../utils/capitalizeWords';
import {formPictureObject} from './formPictureObject';

jest.mock('../utils/capitalizeWords');
jest.mock('./formPictureObject');

describe('freemiumDataMapper', () => {
    it('should map premium weather data to freemium weather item', async () => {
        const mockData: FreemiumWeatherResults = {
            coordinates: {
                lon: 2,
                lat: 2,
            },
            current: {
                temperature: 25,
                icon: 'sunny',
                description: 'clear sky',
            },
            area: {
                timezone: 'central',
                majorCity: 'Washington',
            },
        };

        const mockWeatherPic = {image: 'someImage', imageAltText: 'altText'};
        const mockDescription = 'Clear Sky';

        (formPictureObject as jest.Mock).mockResolvedValue(mockWeatherPic);
        (capitalizeWords as jest.Mock).mockResolvedValue(mockDescription);

        const expectedResult: FreemiumWeatherItem = {
            currentTemp: 25,
            description: mockDescription,
            image: mockWeatherPic,
        };

        const result = await freemiumDataMapper(mockData);

        expect(result).toEqual(expectedResult);
        expect(formPictureObject).toHaveBeenCalledWith('sunny');
        expect(capitalizeWords).toHaveBeenCalledWith('clear sky');
    });
});
