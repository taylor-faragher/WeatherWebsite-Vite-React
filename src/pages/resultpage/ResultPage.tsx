import {useSearchParams} from 'react-router-dom';
import styled from 'styled-components';
import {useWeatherApi} from '../../hooks/useWeatherApi';
import {useState} from 'react';
import ReturnHomeButton from '../shared/ReturnHomeButton';

const ResultsSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50vh;
`;

const ZipCodeTitle = styled.h1`
    text-align: center;
    font-size: 5rem;
    width: 700px;
    height: 100px;
`;

const WeatherResultsSection = styled.div`
    font-size: 5rem;
    text-align: center;
`;

const WeatherPic = styled.img`
    align-self: center;
    width: 200px;
    height: 200px;
`;

const ResultPage = () => {
    const [searchParams] = useSearchParams();
    const [zipCode] = useState(searchParams.get('zipCode') || '');
    const {data, loaded} = useWeatherApi(zipCode);
    const currentTemp = Math.round(data?.currentTemp as number);
    const description = data?.description as string;
    const weatherPic = `/assets/${data?.image.image}`;

    return (
        <>
            <ResultsSection>
                <ZipCodeTitle>Weather Results for {zipCode}</ZipCodeTitle>
                {loaded && (
                    <>
                        <WeatherResultsSection>
                            <div>
                                <WeatherPic src={weatherPic}></WeatherPic>
                                <div>{currentTemp} &deg;F</div>
                                <div>{description}</div>
                            </div>
                        </WeatherResultsSection>
                        <ReturnHomeButton />
                    </>
                )}
            </ResultsSection>
        </>
    );
};

export default ResultPage;
