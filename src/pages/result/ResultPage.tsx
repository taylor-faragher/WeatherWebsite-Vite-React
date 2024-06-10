import {useNavigate, useSearchParams} from 'react-router-dom';
import styled from 'styled-components';
import {useState} from 'react';
import {Loader} from '../shared/Loader';
import {breakPoints} from '../../utils/layout/breakpoints';
import {getFontSize} from '../../utils/layout/getFontSize';
import {ZipCodeForm} from '../shared/ZipCodeForm';
import {fetchWeather} from '../../services/zipCode/WeatherGateway';
import {useQuery} from '@tanstack/react-query';

const ResultsSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    @media screen and ${breakPoints.mobile} {
        padding-top: 0;
        padding-bottom: 85px;
    }
    @media screen and ${breakPoints.tablet} {
        padding-top: 75px;
        padding-bottom: 0px;
    }
`;

const ZipCodeTitle = styled.h1`
    text-align: center;
    @media screen and ${breakPoints.mobile} {
        font-size: ${getFontSize(7)};
    }
    @media screen and ${breakPoints.tablet} {
        margin: 0;
        font-size: ${getFontSize(9)};
    }
`;

const WeatherResultsSection = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    @media screen and ${breakPoints.mobileBig} {
        font-size: ${getFontSize(7)};
    }

    @media screen and ${breakPoints.tabletBig} {
        font-size: ${getFontSize(9)};
    }
`;

const WeatherPicWrapper = styled.div`
    display: flex;
    justify-content: center;
    @media screen and ${breakPoints.mobile} {
        width: 100%;
        height: 250px;
    }
    @media screen and ${breakPoints.tabletBig} {
        width: 100%;
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
        font-size: ${getFontSize(11)};
    }
    @media screen and ${breakPoints.tabletBig} {
        font-size: ${getFontSize(11)};
        margin-bottom: -40px;
    }
`;

const ThermoPicture = styled.img`
    @media screen and ${breakPoints.mobile} {
        margin-top: -20px;
        margin-left: -80px;
        margin-right: -50px;
        height: 250px;
    }
    @media screen and ${breakPoints.tabletBig} {
        margin-top: -40px;
        margin-top: 0px;
        margin-left: -50px;
        height: 200px;
    }
`;

const StyledDescription = styled.div`
    width: 100%;
    @media screen and ${breakPoints.mobile} {
        font-size: ${getFontSize(6)};
    }
    @media screen and ${breakPoints.tabletBig} {
        font-size: ${getFontSize(10)};
    }
`;

const ResultPage = () => {
    const [searchParams] = useSearchParams();
    const [zipCode, setZipCode] = useState(searchParams.get('zipCode'));
    const navigate = useNavigate();
    const {data, error, isLoading} = useQuery({
        queryKey: ['fetchWeather', zipCode],
        queryFn: () => fetchWeather(zipCode as string),
    });
    const currentTemp = Math.round(data?.currentTemp as number);
    const description = data?.description;
    const weatherPic = `/assets/${data?.image.image}`;
    const thermoPic = `/assets/thermometer-fahrenheit.svg`;

    if (error) navigate('/error');

    return (
        <>
            <ResultsSection data-test-id='ResultPage_ResultsSection'>
                <ZipCodeTitle data-test-id='ResultPage_ZipCodeTitle'>Weather Results for {zipCode}</ZipCodeTitle>
                {isLoading && (
                    <div>
                        <Loader />
                    </div>
                )}
                {!isLoading && (
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
                                <TempWrapper data-test-id='ResultPage_TempWrapper'>
                                    {currentTemp} <ThermoPicture src={thermoPic}></ThermoPicture>
                                </TempWrapper>
                                <StyledDescription data-test-id='ResultPage_Description'>
                                    {description}
                                </StyledDescription>
                            </div>
                        </WeatherResultsSection>
                        <ZipCodeForm
                            data-test-id='ResultPage_ZipCodeForm'
                            placeHolderText={'Search Again!'}
                            setZipCode={setZipCode}
                        />
                    </>
                )}
            </ResultsSection>
        </>
    );
};

export default ResultPage;
