import styled from 'styled-components';
import {FaHouse, FaCircleQuestion, FaGithub} from 'react-icons/fa6';
import {HeaderIcon} from './HeaderIcon';
import {breakPoints} from '../../utils/layout/breakpoints';

const HeaderWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 75px;
    background: #202225;
    z-index: 9;
    position: fixed;

    @media screen and ${breakPoints.mobile} {
        bottom: 0;
        top; revert;
    }
    @media screen and ${breakPoints.tabletBig} {
        bottom: revert;
        top: 0;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 500px;
`;

export const Header = () => {
    const showHeader = location.pathname.toLowerCase() !== '/error'; //don't show for error page
    return (
        <>
            {showHeader && (
                <HeaderWrapper data-test-id='Header'>
                    <ButtonWrapper>
                        <HeaderIcon icon={<FaHouse size='25' />} toolTipText='Home' path='/main' testId='home' />
                        <HeaderIcon icon={<FaCircleQuestion size='25' />} toolTipText='FAQ' path='/info' testId='FAQ' />
                        <HeaderIcon
                            icon={<FaGithub size='25' />}
                            toolTipText='See the Code for this Site!'
                            path='https://github.com/taylor-faragher/WeatherWebsite-Vite-React'
                            testId='github'
                        />
                    </ButtonWrapper>
                </HeaderWrapper>
            )}
        </>
    );
};
