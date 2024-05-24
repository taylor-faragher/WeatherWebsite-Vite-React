import styled from 'styled-components';
import {FaHouse, FaCircleQuestion, FaGithub} from 'react-icons/fa6';
import {HeaderIcon} from './HeaderIcon';

const HeaderWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    width: 100%;
    height: 75px;
    background: #202225;
    z-index: 9;
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
                <HeaderWrapper>
                    <ButtonWrapper>
                        <HeaderIcon icon={<FaHouse size='25' />} text='Home' />
                        <HeaderIcon icon={<FaCircleQuestion size='25' />} text='FAQ' />
                        <HeaderIcon icon={<FaGithub size='25' />} text='See the Code for this Site!' />
                    </ButtonWrapper>
                </HeaderWrapper>
            )}
        </>
    );
};
