import {fetchWeather} from './WeatherGateway';
import {mockData} from '../../utils/testData/testData';
import {mapZipCodeData} from '../../mappers/zipCodeDataMapper';

jest.mock('../../mappers/zipCodeDataMapper', () => ({
    mapZipCodeData: jest.fn(),
}));

const finalData = {
    currentTemp: 59.76,
    windSpeed: 5.75,
    description: 'OvercastClouds',
    majorCity: 'TownUSA',
    image: {
        image: '04d.svg',
        imageAltText: 'white cloud with moon behind it',
    },
};

describe('fetchWeather', () => {
    const mockResponse = (status: number, data) => {
        return Promise.resolve({
            ok: status < 400,
            json: () => Promise.resolve(data),
        });
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should fetch weather data by zip code', async () => {
        const gatewayMockData = {mockData};
        const mockZipCode = '12345';

        global.fetch = jest.fn().mockImplementation(() => mockResponse(200, gatewayMockData));
        (mapZipCodeData as jest.Mock).mockResolvedValue(finalData);

        const result = await fetchWeather(mockZipCode);

        expect(fetch).toHaveBeenCalledWith(`https://api.taylorsweatherapi.com/?zipcode=${mockZipCode}`);
        expect(result).toEqual(finalData);
    });

    test('should throw error when response is not ok', async () => {
        const mockErrorResponse = {message: 'Error message'};
        const mockZipCode = '12345';

        global.fetch = jest.fn().mockImplementation(() => mockResponse(404, mockErrorResponse));

        await expect(fetchWeather(mockZipCode)).rejects.toThrow('Error message');
    });

    test('should throw error when zipCode is empty', async () => {
        const mockZipCode = '';

        await expect(fetchWeather(mockZipCode)).rejects.toThrow('Bad Request');
    });
});
