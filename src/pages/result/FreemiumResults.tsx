import {WeatherItem} from 'src/types/types';
import {breakPoints} from '../../utils/layout/breakpoints';
import {getFontSize} from '../../utils/layout/getFontSize';
import {styled} from 'styled-components';

const WeatherResultsSection = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    @media screen and ${breakPoints.mobile} {
        font-size: ${getFontSize(7)};
    }

    @media screen and ${breakPoints.tablet} {
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
    @media screen and ${breakPoints.tablet} {
        width: 100%;
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
        font-size: ${getFontSize(10)};
    }
    @media screen and ${breakPoints.tablet} {
        font-size: ${getFontSize(11)};
        margin-bottom: -40px;
    }
`;

const ThermoPicture = styled.img.attrs(props => ({src: props.theme.thermoPic}))`
    @media screen and ${breakPoints.mobile} {
        margin-top: -20px;
        margin-left: 20px;
        height: 100px;
    }
    @media screen and ${breakPoints.tablet} {
        margin-top: -40px;
        height: 200px;
    }
`;

const StyledDescription = styled.div`
    width: 100%;
    @media screen and ${breakPoints.mobile} {
        font-size: ${getFontSize(7)};
    }
    @media screen and ${breakPoints.tablet} {
        font-size: ${getFontSize(10)};
        margin-top: 20px;
    }
`;
const FreemiumResults = ({data}: {data: WeatherItem}) => {
    const currentTemp = Math.round(data?.currentTemp as number);
    const description = data?.description;
    const weatherPic = `/assets/${data?.image.image}`;
    return (
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
                    {currentTemp} <ThermoPicture></ThermoPicture>
                </TempWrapper>
                <StyledDescription data-test-id='ResultPage_Description'>{description}</StyledDescription>
            </div>
        </WeatherResultsSection>
    );
};

export default FreemiumResults;
