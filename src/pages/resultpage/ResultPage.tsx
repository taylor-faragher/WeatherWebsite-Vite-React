import {useSearchParams} from 'react-router-dom';
import styled from 'styled-components';
import {useWeatherApi} from '../../hooks/useWeatherApi';
import {useState} from 'react';
import ReturnHomeButton from '../shared/ReturnHomeButton';
import {Loader} from '../shared/Loader';
import {breakPoints} from '../../utils/layout/breakpoints';
import {getFontSize} from '../../utils/layout/getFontSize';

const ResultsSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
`;

const ZipCodeTitle = styled.h1`
    text-align: center;
    @media screen and ${breakPoints.mobileBig} {
        font-size: ${getFontSize(12)};
        width: 700px;
        height: 400px;
    }
    @media screen and ${breakPoints.tabletBig} {
        font-size: ${getFontSize(9)};
        height: 100px;
    }
`;

const WeatherResultsSection = styled.div`
    text-align: center;
    @media screen and ${breakPoints.mobileBig} {
        font-size: ${getFontSize(12)};
    }

    @media screen and ${breakPoints.tabletBig} {
        font-size: ${getFontSize(9)};
    }
`;

const WeatherPic = styled.img`
    align-self: center;
    @media screen and ${breakPoints.mobileBig} {
        width: 500px;
        height: 500px;
    }
    @media screen and ${breakPoints.tabletBig} {
        width: 200px;
        height: 200px;
    }
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
                                <WeatherPic src={weatherPic} alt={data?.image.imageAltText}></WeatherPic>
                                <div>{currentTemp} &deg;F</div>
                                <div>{description}</div>
                            </div>
                        </WeatherResultsSection>
                        <ReturnHomeButton />
                    </>
                )}
                {!loaded && (
                    <div>
                        <Loader />
                    </div>
                )}
            </ResultsSection>
        </>
    );
};

export default ResultPage;
