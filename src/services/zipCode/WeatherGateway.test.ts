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

        global.fetch = jest.fn().mockImplementation(() => mockResponse(200, gatewayMockData));

        const result = await fetchWeather(WeatherMethods.cityLookup);

        expect(fetch).toHaveBeenCalledWith('https://api.taylorsweatherapi.com/');
        expect(result).toEqual(gatewayMockData);
    });

    test('should throw error when response is not ok', async () => {
        const mockErrorResponse = {message: 'Error message'};

        global.fetch = jest.fn().mockImplementation(() => mockResponse(404, mockErrorResponse));

        await expect(fetchWeather(WeatherMethods.cityLookup)).rejects.toThrow('Error message');
    });
});
