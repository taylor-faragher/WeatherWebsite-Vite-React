import {useContext} from 'react';
import {AccountContext} from './Account';
import {useQuery} from '@tanstack/react-query';
import {fetchPremiumWeather} from '../gateways/PremiumWeatherGateway';
import {fetchFreemiumWeather} from '../gateways/FreemiumWeatherGateway';

const useWeather = (zipCode: string) => {
    const {user} = useContext(AccountContext);
    let method;
    if (user) {
        method = () => fetchPremiumWeather(zipCode as string, user);
    } else {
        method = () => fetchFreemiumWeather(zipCode as string);
    }

    const {data, error, isLoading} = useQuery({
        queryKey: ['fetchWeather', zipCode],
        queryFn: method,
    });

    return {data, error, isLoading};
};

export default useWeather;
