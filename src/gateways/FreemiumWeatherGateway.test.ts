import {FreemiumWeatherItem} from 'src/types/types';
import {freemiumDataMapper} from '../mappers/freemiumDataMapper';
import {fetchFreemiumWeather} from './FreemiumWeatherGateway';

jest.mock('../mappers/freemiumDataMapper');

global.fetch = jest.fn();

describe('fetchFreemiumWeather', () => {
    const mockZipCode = '12345';
    const mockHeaders = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-api-key': 'bTK3tM6Zwj8cHACQtSRH26aEFwzeQ4ns9YInqoj5',
    };

    const mockResponseData = {
        current: {
            temperature: 25,
            icon: 'sunny',
            description: 'clear sky',
        },
    };

    const mockFreemiumWeatherItem: FreemiumWeatherItem = {
        currentTemp: 25,
        description: 'Clear Sky',
        image: {image: 'someImage', imageAltText: 'altText'},
    };

    beforeEach(() => {
        (global.fetch as jest.Mock).mockClear();
        (freemiumDataMapper as jest.Mock).mockClear();
    });

    it('should fetch and map weather data for a given zip code', async () => {
        (global.fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: async () => mockResponseData,
        });
        (freemiumDataMapper as jest.Mock).mockResolvedValue(mockFreemiumWeatherItem);

        const result = await fetchFreemiumWeather(mockZipCode);

        expect(global.fetch).toHaveBeenCalledWith(`https://api.taylorsweatherapi.com/?zipcode=${mockZipCode}`, {
            headers: mockHeaders,
        });
        expect(freemiumDataMapper).toHaveBeenCalledWith(mockResponseData);
        expect(result).toEqual(mockFreemiumWeatherItem);
    });

    it('should reject with an error if zip code is not provided', async () => {
        await expect(fetchFreemiumWeather('')).rejects.toThrow('Bad Request');
    });

    it('should throw an error if the fetch response is not ok', async () => {
        const mockErrorResponse = {message: 'Some error'};
        (global.fetch as jest.Mock).mockResolvedValue({
            ok: false,
            json: async () => mockErrorResponse,
        });

        await expect(fetchFreemiumWeather(mockZipCode)).rejects.toThrow(JSON.stringify(mockErrorResponse.message));
    });
});
