import {useState} from 'react';
import {styled} from 'styled-components';
import HourlyResults from './HourlyResults';
import DailyResults from './DailyResults';
import {getFontSize} from '../../utils/layout/getFontSize';

const ResultCardWrapper = styled.div`
    padding-top: 25px;
`;

const FlipCard = styled.div<{$toBeFlipped}>`
    background-color: transparent;
    height: 200px;
    border: 0;
    perspective: 1000px;
    transform: ${({$toBeFlipped}) => ($toBeFlipped ? 'rotateY(180deg)' : 'none')};
`;

const HourlyButton = styled.button<{$activeButton}>`
    width: 200px;
    font-size: ${getFontSize(4)};
    border: ${({theme}) => theme.resultCardBorder};
    border-radius: 10px 0 0 10px;
    pointer-events: ${({$activeButton}) => ($activeButton ? 'none' : null)};
    background-color: ${({$activeButton, theme}) => theme.resultCardButtonBackground[$activeButton]};
    color: ${({$activeButton, theme}) => theme.resultCardButtonColor[$activeButton]};
`;

const DailyButton = styled.button<{$activeButton}>`
    width: 200px;
    font-size: ${getFontSize(4)};
    border: ${({theme}) => theme.resultCardBorder};
    border-radius: 0 10px 10px 0;
    pointer-events: ${({$activeButton}) => ($activeButton ? 'none' : null)};
    background-color: ${({$activeButton, theme}) => theme.resultCardButtonBackground[$activeButton]};
    color: ${({$activeButton, theme}) => theme.resultCardButtonColor[$activeButton]};
`;

/* This container is needed to position the front and back side */
const FlipCardInner = styled.div<{$toBeFlipped}>`
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
    transform: ${({$toBeFlipped}) => ($toBeFlipped ? 'rotateY(180deg)' : 'none')};
`;

/* Position the front and back side */
const FlipCardFront = styled.div<{$toBeFlipped}>`
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    display: ${({$toBeFlipped}) => ($toBeFlipped ? 'none' : 'inherit')};
`;

const FlipCardBack = styled.div<{$toBeFlipped}>`
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    transform: ${({$toBeFlipped}) => ($toBeFlipped ? 'none' : 'rotateY(180deg)')};
`;

const ResultCard = ({hourlyData, dailyData}) => {
    const [flipValue, setFlipValue] = useState<boolean>(false);
    const [activeButton, setActiveButton] = useState(true);

    const turnCardOver = () => {
        setActiveButton(!activeButton);
        setFlipValue(!flipValue);
    };

    return (
        <ResultCardWrapper>
            <HourlyButton $activeButton={activeButton} onClick={turnCardOver}>
                Hourly
            </HourlyButton>
            <DailyButton $activeButton={!activeButton} onClick={turnCardOver}>
                Daily
            </DailyButton>
            <FlipCard $toBeFlipped={flipValue}>
                <FlipCardInner $toBeFlipped={flipValue}>
                    <FlipCardFront $toBeFlipped={flipValue}>
                        <HourlyResults hourlyData={hourlyData}></HourlyResults>
                    </FlipCardFront>
                    <FlipCardBack $toBeFlipped={flipValue}>
                        <DailyResults dailyData={dailyData}></DailyResults>
                    </FlipCardBack>
                </FlipCardInner>
            </FlipCard>
        </ResultCardWrapper>
    );
};

export default ResultCard;
