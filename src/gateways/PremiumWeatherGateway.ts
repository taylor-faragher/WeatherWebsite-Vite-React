import {PremiumWeatherItem} from 'src/types/types';
import {premiumDataMapper} from '../mappers/premiumDataMapper';

export const fetchPremiumWeather = async (zipCode: string, user): Promise<PremiumWeatherItem> => {
    if (!zipCode) {
        return Promise.reject(new Error('Bad Request'));
    }
    try {
        const keys = Object.keys(localStorage);
        const keyStorage = keys.find(key => key.includes(`${user.username}.accessToken`));
        const tokenKey = keyStorage ? localStorage.getItem(keyStorage) : null;

        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'x-api-key': 'bTK3tM6Zwj8cHACQtSRH26aEFwzeQ4ns9YInqoj5',
            authorization: `Bearer ${tokenKey}`,
        };

        const response: Response = await fetch(`https://api.taylorsweatherapi.com/premium/?zipcode=${zipCode}`, {
            headers: headers,
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(JSON.stringify(data.message));
        }
        const mappedData = await premiumDataMapper(data);

        return mappedData;
    } catch {
        throw new Error('Error getting Premium Data');
    }
};
