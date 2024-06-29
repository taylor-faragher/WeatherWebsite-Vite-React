/**
 * @jest-environment jsdom
 */

import {fetchPremiumWeather} from './PremiumWeatherGateway';
import {premiumDataMapper} from '../mappers/premiumDataMapper';
import {mockData} from '../utils/testData/testData';

jest.mock('../mappers/premiumDataMapper.ts', () => ({
    premiumDataMapper: jest.fn(),
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

    const mockUser = {
        username: 'someId',
    };

    beforeEach(() => {
        jest.resetAllMocks();
        localStorage.setItem(`someId.accessToken`, 'someToken');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should fetch weather data by zip code', async () => {
        const gatewayMockData = {mockData};
        const mockZipCode = '12345';

        // const tokenValue = 'someToken';

        // const headers = {
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json',
        //     'x-api-key': 'bTK3tM6Zwj8cHACQtSRH26aEFwzeQ4ns9YInqoj5',
        //     authorization: `Bearer ${tokenValue}`,
        // };

        global.fetch = jest.fn().mockImplementation(() => mockResponse(200, gatewayMockData));
        (premiumDataMapper as jest.Mock).mockResolvedValue(finalData);

        const result = await fetchPremiumWeather(mockZipCode, mockUser);

        // expect(fetch).toHaveBeenCalledWith(`https://api.taylorsweatherapi.com/premium?zipcode=${mockZipCode}`, {
        //     headers,
        // });
        expect(result).toEqual(finalData);
    });

    test('should throw error when response is not ok', async () => {
        const mockErrorResponse = {message: 'Error message'};
        const mockZipCode = '12345';

        global.fetch = jest.fn().mockImplementation(() => mockResponse(404, mockErrorResponse));

        await expect(fetchPremiumWeather(mockZipCode, mockUser)).rejects.toThrow('Error getting Premium Data');
    });

    test('should throw error when zipCode is empty', async () => {
        const mockZipCode = '';

        await expect(fetchPremiumWeather(mockZipCode, mockUser)).rejects.toThrow('Bad Request');
    });
});
