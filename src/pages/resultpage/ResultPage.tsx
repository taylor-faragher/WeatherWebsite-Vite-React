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
    display: flex;
    flex-direction: column;
    text-align: center;
    @media screen and ${breakPoints.mobileBig} {
        font-size: ${getFontSize(12)};
    }

    @media screen and ${breakPoints.tabletBig} {
        font-size: ${getFontSize(9)};
    }
`;

const WeatherPicWrapper = styled.div`
    display: flex;
    justify-content: center;
    alignt-items: center;
    align-self: center;
    @media screen and ${breakPoints.mobileBig} {
        width: 500px;
        height: 500px;
    }
    @media screen and ${breakPoints.tabletBig} {
        width: 300px;
        height: 300px;
`;

const WeatherPic = styled.img`
    width: 100%;
    height: auto;
`;

const TempWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    @media screen and ${breakPoints.mobile} {
        font-size: ${getFontSize(12)};
    }
    @media screen and ${breakPoints.tabletBig} {
        font-size: ${getFontSize(10)};
    }
`;

const ThermoPicture = styled.img`
    height: 120px;
    margin-top: -20px;
    margin-left: -40px;
    @media screen and ${breakPoints.mobile} {
        height: 250px;
    }
    @media screen and ${breakPoints.tabletBig} {
        height: 150px;
    }
`;

const StyledDescription = styled.div`
    @media screen and ${breakPoints.mobile} {
        font-size: ${getFontSize(11)};
    }
    @media screen and ${breakPoints.tabletBig} {
        font-size: ${getFontSize(10)};
    }
`;

const ResultPage = () => {
    const [searchParams] = useSearchParams();
    const [zipCode] = useState(searchParams.get('zipCode') || '');
    const {data, loaded} = useWeatherApi(zipCode);
    const currentTemp = Math.round(data?.currentTemp as number);
    const description = data?.description as string;
    const weatherPic = `/assets/${data?.image.image}`;
    const thermoPic = `/assets/thermometer-fahrenheit.svg`;

    return (
        <>
            <ResultsSection>
                <ZipCodeTitle data-test-id='ResultPage_ZipCodeTitle'>Weather Results for {zipCode}</ZipCodeTitle>
                {loaded && (
                    <>
                        <WeatherResultsSection data-test-id='ResultsPage_WeatherResultsSection'>
                            <WeatherPicWrapper data-test-id='ResultPage_WeatherPicWrapper'>
                                <WeatherPic
                                    src={weatherPic}
                                    alt={data?.image.imageAltText}
                                    data-test-id='ResultPage_WeatherPic'
                                ></WeatherPic>
                            </WeatherPicWrapper>
                            <div data-test-id='ResultPage_WeatherInfoWrapper'>
                                <TempWrapper data-test-id='ResultPage_CurrentTemp'>
                                    {currentTemp} <ThermoPicture src={thermoPic}></ThermoPicture>
                                </TempWrapper>
                                <StyledDescription data-test-id='ResultPage_Description'>
                                    {description}
                                </StyledDescription>
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
