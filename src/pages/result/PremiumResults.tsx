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
        max-width: 100vw;
    }
    @media screen and ${breakPoints.tablet} {
        max-width: 700px;
    }
`;
const CurrentInfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    padding-bottom: 10px;
`;

const CurrentResults = styled.div`
    display: flex;
    flex-direction: column;
`;

const CurrentIcon = styled.img`
    @media screen and ${breakPoints.mobile} {
        height: 85px;
    }
    @media screen and ${breakPoints.tablet} {
        height: 140px;
    }
`;

const DescriptionWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    @media screen and ${breakPoints.mobile} {
    }
    @media screen and ${breakPoints.tablet} {
    }
`;

const CurrentDescription = styled.h1`
    @media screen and ${breakPoints.mobile} {
        font-size: 1.75rem;
        width: 250px;
        text-align: left;
        margin: 0;
    }
    @media screen and ${breakPoints.tablet} {
        font-size: ${getFontSize(6)};
        width: 400px;
        text-align: left;
        margin: 0;
    }
`;

const TempWrapper = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: end;
    @media screen and ${breakPoints.mobile} {
        font-size: ${getFontSize(6)};
    }
    @media screen and ${breakPoints.tablet} {
        font-size: ${getFontSize(8)};
        width: 150px;
    }
`;

const ThermoPicture = styled.img.attrs(props => ({src: props.theme.thermoPic}))`
    width: auto;

    @media screen and ${breakPoints.mobile} {
        height: 35px;
        vertical-align: bottom;
    }
    @media screen and ${breakPoints.tablet} {
        height: 45px;
    }
`;

const WindSpeedWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    @media screen and ${breakPoints.mobile} {
        font-size: 0.75rem;
    }
`;

const CurrentCity = styled.h1`
    @media screen and ${breakPoints.mobile} {
        width: 200px;
        font-size: ${getFontSize(2)};
        text-align: left;
        margin: 0;
    }
    @media screen and ${breakPoints.tablet} {
        width: 400px;
        font-size: ${getFontSize(3)};
        text-align: left;
        margin: 0;
    }
`;

const WindSpeedIcon = styled.img`
    height: 25px;
`;

const WindSpeed = styled.h3`
    @media screen and ${breakPoints.mobile} {
        margin: 0 5px 0 -4px;
    }
    @media screen and ${breakPoints.tablet} {
        margin: 0 5px 0 0;
        font-size: ${getFontSize(3)};
    }
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
            <CurrentInfoWrapper data-test-id='CurrentInfoWrapper'>
                <CurrentIcon src={weatherPic}></CurrentIcon>
                <CurrentResults data-test-id='CurrentResults'>
                    <DescriptionWrapper data-test-id='DescriptionWrapper'>
                        <CurrentDescription data-test-id='CurrentDescription'>{description}</CurrentDescription>
                        <TempWrapper data-test-id='TempWrapper'>
                            {currentTemp} <ThermoPicture></ThermoPicture>
                        </TempWrapper>
                    </DescriptionWrapper>
                    <WindSpeedWrapper data-test-id='WindSpeedWrapper'>
                        <CurrentCity data-test-id='CurrentCity'>{majorCity}</CurrentCity>
                        <WindSpeedIcon src={windIcon}></WindSpeedIcon>
                        <WindSpeed>
                            {windSpeed} mph {getWindDirection(data.windDirection)}
                        </WindSpeed>
                    </WindSpeedWrapper>
                </CurrentResults>
            </CurrentInfoWrapper>
            <HourlyResults hourlyData={hourlyData}></HourlyResults>
        </PremiumResultsWrapper>
    );
};

export default PremiumResults;
