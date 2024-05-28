import {styled} from 'styled-components';
import {FaRegMoon} from 'react-icons/fa';
import {LuSun} from 'react-icons/lu';

const DarkModeButtonWrapper = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    background-color: ${({theme}) => theme.headerIconBackgroundColor};
    border: 2px solid ${({theme}) => theme.toggleBorder};
    color: ${({theme}) => theme.headerIconColor};
    height: 3rem;
    width: 3rem;
    cursor: pointer;
    margin-right: auto;
    margin-left: auto;
    border-radius: 2rem;
    transition-property: all;
    transition-duration: 300ms;
    &:hover {
        border-radius: 0.5rem;
        background-color: rgb(22 163 74);
        color: rgb(255 255 255);
    }
`;

const HeaderTooltip = styled.span`
    position: absolute;
    width: auto;
    margin: 0.5rem;
    border-radius: 0.375rem;
    min-width: max-content;
    top: 50px;
    padding: 0.5rem;
    margin: 0.5rem;
    background-color: rgb(75 85 99);
    border-radius: 0.375rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    transition-property: all;
    transition-duration: 100ms;
    transform: scale(0);
    transform-origin: top;

    ${DarkModeButtonWrapper}:hover & {
        transform: scale(1);
    }
`;

export const DarkModeSwitch = ({theme, themeSwitch}) => {
    return (
        <DarkModeButtonWrapper onClick={themeSwitch}>
            {theme == 'light' ? <LuSun size='25' /> : <FaRegMoon size='25' />}
            <HeaderTooltip data-test-id='HeaderToolTip'>
                {theme == 'light' ? 'Switch To Dark Mode' : 'Switch to Light Mode'}
            </HeaderTooltip>
        </DarkModeButtonWrapper>
    );
};
