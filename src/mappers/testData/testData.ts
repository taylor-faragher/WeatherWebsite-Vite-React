import {WeatherResults} from '../../types/types';

export const mockData: WeatherResults = {
    coord: {
        lon: -12.345,
        lat: 98.765,
    },
    weather: [
        {
            id: 804,
            main: 'Clouds',
            description: 'overcast clouds',
            icon: '04d',
        },
    ],
    base: 'stations',
    main: {
        temp: 59.76,
        feels_like: 58.91,
        temp_min: 53.98,
        temp_max: 64.11,
        pressure: 1009,
        humidity: 74,
    },
    visibility: 10000,
    wind: {
        speed: 5.75,
        deg: 60,
    },
    clouds: {
        all: 100,
    },
    dt: 1715558333,
    sys: {
        type: 2,
        id: 2039825,
        country: 'US',
        sunrise: 1715507876,
        sunset: 1715559068,
    },
    timezone: -14400,
    id: 0,
    name: 'TownUSA',
    cod: 200,
};
