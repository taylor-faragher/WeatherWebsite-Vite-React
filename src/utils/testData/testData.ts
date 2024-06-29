import {PremiumWeatherResults} from '../../types/types';

export const mockData: PremiumWeatherResults = {
    coordinates: {
        lon: -12.345,
        lat: 98.765,
    },
    current: {
        description: 'clear sky',
        icon: '01d',
        temperature: 88,
        minTemperature: 69,
        maxTemperature: 89,
        summary: 'Expect a day of partly cloudy with clear spells',
        sunrise: '5:24 AM',
        sunset: '8:01 PM',
        pressure: 1020,
        humidity: 63,
        visibility: 10000,
        windSpeed: 10.36,
        windDirection: 130,
    },
    hourly: [
        {
            time: '2:00 PM',
            temp: 88,
            icon: '01d',
            description: 'clear sky',
        },
    ],
    daily: [
        {
            day: 'Tuesday',
            avgTemp: 82,
            minTemp: 71,
            maxTemp: 84,
            icon: '10d',
            description: 'light rain',
            summary: 'Expect a day of partly cloudy with rain',
            sunrise: '5:24 AM',
            sunset: '8:01 PM',
        },
    ],
    area: {
        timezone: 'Central',
        majorCity: 'SomeCity',
    },
};

export const incompleteMockData = {
    weather: [{icon: '01d', description: 'clear sky'}],
    name: 'London',
};
