import {useSearchParams} from 'react-router-dom';
import styled from 'styled-components';
import {useWeatherApi} from '../../hooks/useWeatherApi';
import {useState} from 'react';

const ZipCodeTitle = styled.h1``;

const ResultPage = () => {
    const [searchParams] = useSearchParams();
    const [zipCode] = useState(searchParams.get('zipCode') || '');
    const {data, loaded} = useWeatherApi(zipCode);

    return (
        <>
            <ZipCodeTitle>Weather Results for {zipCode}</ZipCodeTitle>
            <div>Loaded: {loaded}</div>
            <div>{data?.currentTemp}</div>
        </>
    );
};

export default ResultPage;
