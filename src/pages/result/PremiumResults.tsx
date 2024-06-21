import {breakPoints} from '../../utils/layout/breakpoints';
import {getFontSize} from '../../utils/layout/getFontSize';
import {styled} from 'styled-components';
import {WeatherItem} from 'src/types/types';
import HourlyResults from './HourlyResults';
import getWindDirection from '../../utils/getWindDirection';

const PremiumResultsWrapper = styled.div`
    border: 1px;
    outline: 1px;
    @media screen and ${breakPoints.mobile} {
        min-width: 320px;
    }
    @media screen and ${breakPoints.tablet} {
        min-width: 600px;
    }
`;

const CurrentResults = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 85px;
    padding-bottom: 20px;
`;

const CurrentIcon = styled.img`
    @media screen and ${breakPoints.mobile} {
        height: 85px;
    }
`;

const DiscriptionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    @media screen and ${breakPoints.mobile} {
        width: 225px;
    }
    @media screen and ${breakPoints.tablet} {
        width: 380px;
    }
`;

const CurrentDescription = styled.h1`
    @media screen and ${breakPoints.mobile} {
        font-size: ${getFontSize(5)};
        text-align: left;
        margin: 0;
    }
`;

const CurrentCity = styled.h1`
    @media screen and ${breakPoints.mobile} {
        width: 200px;
        font-size: ${getFontSize(2)};
        text-align: left;
        margin: 0;
    }
`;

const TemperatureInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const TempWrapper = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: center;
    @media screen and ${breakPoints.mobile} {
        font-size: ${getFontSize(6)};
        margin-right: 10px;
    }
    @media screen and ${breakPoints.tablet} {
        font-size: ${getFontSize(6)};
    }
`;

const ThermoPicture = styled.img.attrs(props => ({src: props.theme.thermoPic}))`
    width: auto;

    @media screen and ${breakPoints.mobile} {
        height: 35px;
        vertical-align: bottom;
    }
    @media screen and ${breakPoints.tablet} {
        height: 35px;
    }
`;

const WindSpeedWrapper = styled.div`
    display: flex;
    flex-direction: row;
    @media screen and ${breakPoints.mobile} {
        font-size: 0.75rem;
    }
`;

const WindSpeedIcon = styled.img`
    height: 25px;
`;

const WindSpeed = styled.h3`
    margin: 0 5px 0 -4px;
`;

const PremiumResults = ({data}: {data: WeatherItem}) => {
    const currentTemp = data?.currentTemp;
    const weatherPic = `/assets/${data?.image.image}`;
    const windSpeed = data?.windSpeed;
    const windIcon = '/assets/wind.svg';
    const description = data?.description;
    const hourlyData = data?.hourlyData;
    const majorCity = data?.majorCity;

    if (!data) {
        return <div>No data available</div>;
    }

    return (
        <PremiumResultsWrapper data-test-id='PremiumResultsWrapper'>
            <CurrentResults>
                <CurrentIcon src={weatherPic}></CurrentIcon>
                <DiscriptionWrapper>
                    <CurrentDescription>{description}</CurrentDescription>
                    <CurrentCity>{majorCity}</CurrentCity>
                </DiscriptionWrapper>
                <TemperatureInfoWrapper data-test-id='TemperatureInfoWrapper'>
                    <TempWrapper data-test-id='TempWrapper'>
                        {currentTemp} <ThermoPicture></ThermoPicture>
                    </TempWrapper>
                    <WindSpeedWrapper data-test-id='WindSpeedWrapper'>
                        <WindSpeedIcon src={windIcon}></WindSpeedIcon>
                        <WindSpeed>
                            {windSpeed} mph {getWindDirection(data.windDirection)}
                        </WindSpeed>
                    </WindSpeedWrapper>
                </TemperatureInfoWrapper>
            </CurrentResults>
            <HourlyResults hourlyData={hourlyData}></HourlyResults>
        </PremiumResultsWrapper>
    );
};

export default PremiumResults;
