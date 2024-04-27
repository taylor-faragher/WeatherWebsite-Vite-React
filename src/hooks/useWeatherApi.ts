import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {mapZipCodeData} from '../mappers/zipCodeDataMapper';
import {WeatherItem, WeatherMethods} from '../types/types';
import {fetchWeather} from '../services/zipCode/WeatherGateway';

export const useWeatherApi = (zipCode?: string): {data: WeatherItem | undefined; loaded: boolean} => {
    const [data, setData] = useState<WeatherItem>();
    const [loaded, setLoaded] = useState<boolean>(false);
    const navigate = useNavigate();
    const method = WeatherMethods.zipCode;

    useEffect(() => {
        const retrieveWeather = async () => {
            await fetchWeather(method, zipCode)
                ?.then(content => {
                    console.log('content: ', content);
                    setData(mapZipCodeData(content));
                    setLoaded(true);
                })
                .catch((e: Error) => {
                    console.log(`There was an error getting the weather: ${e}`);
                    navigate('/error');
                });
        };
        void retrieveWeather();
    }, [method, zipCode, navigate]);

    return {data: data, loaded: loaded};
};
