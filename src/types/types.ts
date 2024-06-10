export type WeatherItem = {
    currentTemp: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    windDirection: number;
    description: string;
    majorCity: string;
    image: FullImage;
};

export type FullImage = {
    image: string;
    imageAltText: string;
};

type GeoCoords = {
    lon: number;
    lat: number;
};

type WeatherValues = {
    description: string;
    icon: string;
    temperature: number;
    feelsLike: number;
    pressure: number;
    humidity: number;
    visibility: number;
    windSpeed: number;
    windDirection: number;
};

type AreaValues = {
    country: string;
    sunrise: EpochTimeStamp;
    sunset: EpochTimeStamp;
    timezone: number;
    majorCity: string;
};

export type WeatherResults = {
    coordinates: GeoCoords;
    weather: WeatherValues;
    area: AreaValues;
};
