import {fetchWeather} from './WeatherGateway';
import {WeatherMethods} from '../../types/types';
import {mockData} from '../../utils/testData/testData';

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

        const result = await fetchWeather(WeatherMethods.zipCode, mockZipCode);

        expect(fetch).toHaveBeenCalledWith(`https://api.taylorsweatherapi.com/?zipcode=${mockZipCode}`);
        expect(result).toEqual(gatewayMockData);
    });

    test('should fetch weather data by city lookup', async () => {
        const gatewayMockData = {mockData};
        const mockZipCode = '12345';

        global.fetch = jest.fn().mockImplementation(() => mockResponse(200, gatewayMockData));

        const result = await fetchWeather(WeatherMethods.cityLookup, mockZipCode);

        expect(fetch).toHaveBeenCalledWith('https://api.taylorsweatherapi.com/');
        expect(result).toEqual(gatewayMockData);
    });

    test('should throw error when response is not ok', async () => {
        const mockErrorResponse = {message: 'Error message'};
        const mockZipCode = '12345';

        global.fetch = jest.fn().mockImplementation(() => mockResponse(404, mockErrorResponse));

        await expect(fetchWeather(WeatherMethods.cityLookup, mockZipCode)).rejects.toThrow('Error message');
    });

    test('should throw error when zipCode is empty', async () => {
        const mockZipCode = '';

        await expect(fetchWeather(WeatherMethods.cityLookup, mockZipCode)).rejects.toThrow('Bad Request');
    });

    test('should throw error when zipCode is undefined', async () => {
        const mockZipCode = undefined;

        await expect(fetchWeather(WeatherMethods.cityLookup, mockZipCode as unknown as string)).rejects.toThrow(
            'Bad Request'
        );
    });
});
