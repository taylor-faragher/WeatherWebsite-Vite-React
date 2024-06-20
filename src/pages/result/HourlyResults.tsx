import {getFontSize} from '../../utils/layout/getFontSize';
import {breakPoints} from '../../utils/layout/breakpoints';
import {styled} from 'styled-components';

const HourlyResultsWrapper = styled.div``;

const HourlyFieldSet = styled.fieldset`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    padding: 0;
    margin: 0;
`;

const StyledLegend = styled.legend`
    text-align: left;
    @media screen and ${breakPoints.mobile} {
        font-size: ${getFontSize(2)};
    }
`;

const HourWrapper = styled.div`
    padding: 0 3px 0 3px;
`;

const HourTime = styled.h1`
    @media screen and ${breakPoints.mobile} {
        font-size: ${getFontSize(2)};
    }
`;

const HourIcon = styled.img`
    @media screen and ${breakPoints.mobile} {
        width: 75px;
        height: auto;
    }
`;

const HourTemp = styled.h3``;

const HourlyResults = ({hourlyData}) => {
    if (!Array.isArray(hourlyData)) {
        console.error('hourlyData is not an array:', hourlyData);
        return null;
    }

    return (
        <HourlyResultsWrapper>
            <HourlyFieldSet data-test-id='ChangeEmailBorder'>
                <StyledLegend>Hourly Weather</StyledLegend>
                {hourlyData.slice(0, 5).map((hour, index) => (
                    <HourWrapper key={index}>
                        <HourTime>{hour.time}</HourTime>
                        <HourIcon src={`./assets/${hour.icon}.svg`}></HourIcon>
                        <HourTemp>{hour.temp} &deg;F</HourTemp>
                    </HourWrapper>
                ))}
            </HourlyFieldSet>
        </HourlyResultsWrapper>
    );
};

export default HourlyResults;
