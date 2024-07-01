export type PremiumWeatherItem = {
    currentTemp: number;
    humidity: number;
    windSpeed: number;
    windDirection: number;
    description: string;
    hourlyData: HourlyData[];
    dailyData: DailyData[];
    image: FullImage;
    majorCity: string;
};

export type FreemiumWeatherItem = {
    currentTemp: number;
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

type PremiumCurrentWeather = {
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

type FreemiumCurrentWeather = {
    temperature: number;
    icon: string;
    description: string;
};

export type HourlyData = {
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

export type PremiumWeatherResults = {
    coordinates: GeoCoords;
    current: PremiumCurrentWeather;
    hourly: HourlyData[];
    daily: DailyData[];
    area: {
        timezone: string;
        majorCity: string;
    };
};

export type FreemiumWeatherResults = {
    coordinates: GeoCoords;
    current: FreemiumCurrentWeather;
    area: {
        timezone: string;
        majorCity: string;
    };
};
