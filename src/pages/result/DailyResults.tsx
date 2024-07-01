import {getFontSize} from '../../utils/layout/getFontSize';
import {breakPoints} from '../../utils/layout/breakpoints';
import {styled} from 'styled-components';

const DailyResultsWrapper = styled.div``;

const DailyFieldSet = styled.fieldset`
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

const DayWrapper = styled.div`
    padding: 0 3px 0 3px;
`;

const DayTime = styled.h1`
    @media screen and ${breakPoints.mobile} {
        font-size: ${getFontSize(2)};
    }
`;

const DayIcon = styled.img`
    @media screen and ${breakPoints.mobile} {
        width: 75px;
        height: auto;
    }
`;

const DayTemp = styled.h3``;

const DailyResults = ({dailyData}) => {
    if (!Array.isArray(dailyData)) {
        console.error('dailyData is not an array:', dailyData);
        return null;
    }

    return (
        <DailyResultsWrapper data-test-id='DailyResultsWrapper'>
            <DailyFieldSet data-test-id='DailyFieldSet'>
                <StyledLegend>Daily Weather</StyledLegend>
                {dailyData.slice(0, 5).map((day, index) => (
                    <DayWrapper key={index}>
                        <DayTime>{day.day}</DayTime>
                        <DayIcon src={`./assets/${day.icon}.svg`}></DayIcon>
                        <DayTemp>{day.avgTemp} &deg;F</DayTemp>
                    </DayWrapper>
                ))}
            </DailyFieldSet>
        </DailyResultsWrapper>
    );
};

export default DailyResults;
