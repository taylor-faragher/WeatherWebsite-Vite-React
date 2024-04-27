export type WeatherItem = {
    currentTemp: number;
    windSpeed: number;
    description: string;
    majorCity: string;
    image: FullImage;
};

export type FullImage = {
    image: string;
    imageAltText: string;
};

type WeatherDescriptors = {
    id: number;
    main: string;
    description: string;
    icon: string;
};

type WeatherInfo = {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
};

type WindItem = {
    speed: number;
    deg: number;
    gust: number;
};

type CloudItem = {
    all: number;
};

type SystemItem = {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
};

export type WeatherResults = {
    coord: GeolocationCoordinates;
    weather: [WeatherDescriptors];
    base: string;
    main: WeatherInfo;
    visibility: number;
    wind: WindItem;
    clouds: CloudItem;
    dt: number;
    sys: SystemItem;
    timezone: number;
    id: number;
    name: string;
    cod: number;
};

export enum WeatherMethods {
    zipCode = 'zipCode',
    cityLookup = 'cityLookup',
}
