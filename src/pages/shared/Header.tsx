import styled from 'styled-components';
import {FaHouse, FaCircleQuestion, FaGithub} from 'react-icons/fa6';
import {HeaderIcon} from './HeaderIcon';
import {breakPoints} from '../../utils/layout/breakpoints';
import {DarkModeSwitch} from './DarkModeSwitch';
import LoginLogoutButton from './LoginLogoutButton';

const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 75px;
    background: ${({theme}) => theme.headerBody};
    z-index: 9;
    position: fixed;

    @media screen and ${breakPoints.mobile} {
        bottom: 0;
        top; revert;
        border-top: ${({theme}) => theme.headerBorderBottom};

    }
    @media screen and ${breakPoints.tabletBig} {
        bottom: revert;
        border-bottom: ${({theme}) => theme.headerBorderBottom};
        top: 0;
    }
`;

const LeftHeaderWrapper = styled.div``;

const CenterHeaderWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex: 1;
    max-width: 500px;
`;

const RightHeaderWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-right: 15px;
    margin-left: -67px;
`;

export const Header = ({theme, themeSwitch}) => {
    const showHeader = location.pathname.toLowerCase() !== '/error'; //don't show for error page
    return (
        <>
            {showHeader && (
                <HeaderWrapper data-test-id='HeaderWrapper'>
                    <LeftHeaderWrapper></LeftHeaderWrapper>
                    <CenterHeaderWrapper>
                        <HeaderIcon icon={<FaHouse size='25' />} toolTipText='Home' path='/main' testId='home' />
                        <HeaderIcon icon={<FaCircleQuestion size='25' />} toolTipText='FAQ' path='/info' testId='FAQ' />
                        <HeaderIcon
                            icon={<FaGithub size='25' />}
                            toolTipText='See the Code for this Site!'
                            path='https://github.com/taylor-faragher/WeatherWebsite-Vite-React'
                            testId='github'
                        />
                        <DarkModeSwitch theme={theme} themeSwitch={themeSwitch} />
                    </CenterHeaderWrapper>
                    <RightHeaderWrapper>
                        <LoginLogoutButton></LoginLogoutButton>
                    </RightHeaderWrapper>
                </HeaderWrapper>
            )}
        </>
    );
};
