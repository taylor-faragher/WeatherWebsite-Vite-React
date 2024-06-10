import {WeatherResults} from '../../types/types';

export const mockData: WeatherResults = {
    coordinates: {
        lon: -12.345,
        lat: 98.765,
    },
    weather: {
        description: 'windy',
        icon: 'i2d',
        temperature: 59,
        feelsLike: 59,
        pressure: 49,
        humidity: 100,
        visibility: 44,
        windSpeed: 10,
        windDirection: 360,
    },
    area: {
        country: 'US',
        sunrise: 12345,
        sunset: 123456,
        timezone: 12,
        majorCity: 'Smyrna',
    },
};

export const incompleteMockData = {
    weather: [{icon: '01d', description: 'clear sky'}],
    name: 'London',
};
