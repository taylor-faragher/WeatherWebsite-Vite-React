export type WeatherItem = {
    currentTemp: number;
    humidity: number;
    windSpeed: number;
    windDirection: number;
    description: string;
    image: FullImage;
};

export type CharacterType = 'none' | 'correct' | 'incorrect';

export type FullImage = {
    image: string;
    imageAltText: string;
};

type GeoCoords = {
    lon: number;
    lat: number;
};

type CurrentWeather = {
    description: string;
    icon: string;
    temperature: number;
    minTemperature: number;
    maxTemperature: number;
    summary: string;
    sunrise: string;
    sunset: string;
    pressure: number;
    humidity: number;
    visibility: number;
    windSpeed: number;
    windDirection: number;
};

type HourlyData = {
    time: string;
    temp: number;
    icon: string;
    description: string;
};

type DailyData = {
    day: string;
    avgTemp: number;
    minTemp: number;
    maxTemp: number;
    icon: string;
    description: string;
    summary: string;
    sunrise: string;
    sunset: string;
};

export type WeatherResults = {
    coordinates: GeoCoords;
    current: CurrentWeather;
    hourly: HourlyData[];
    daily: DailyData[];
    area: {
        timezone: string;
    };
};
