import {styled} from 'styled-components';
import {GrLogin} from 'react-icons/gr';
import {CgProfile} from 'react-icons/cg';
import {breakPoints} from '../../../utils/layout/breakpoints';
import {useNavigate} from 'react-router-dom';
import {AccountContext} from '../../../services/Account';
import {useContext} from 'react';

const LoginLogoutButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 3rem;
    width: 3rem;
    cursor: pointer;
    background-color: ${({theme}) => theme.headerIconBackgroundColor};
    border: 2px solid ${({theme}) => theme.toggleBorder};
    border-radius: 2rem;
    transition-property: all;
    transition-duration: 300ms;
    color: ${({theme}) => theme.headerIconColor};
    &:hover {
        border-radius: 0.5rem;
        background-color: rgb(22 163 74);
        color: rgb(255 255 255);
    }
    @media screen and ${breakPoints.mobile} {
        position: fixed;
        bottom: 100px;
        right: 30px;
    }
    @media screen and ${breakPoints.tabletBig} {
        z-index: 9;
        position: fixed;
        top: 11.5px;
        right: 20px;
    }
`;

const LoggedInToolTipComponent = styled.span`
    position: absolute;
    width: auto;
    margin: 0.5rem;
    border-radius: 0.375rem;
    min-width: max-content;
    top: 65px;
    padding: 0.5rem;
    margin: 0.5rem;
    background-color: rgb(75 85 99);
    border-radius: 0.375rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    transition-property: all;
    transition-duration: 100ms;
    transform: scale(0);
    transform-origin: top;

    ${LoginLogoutButtonWrapper}:hover & {
        transform: scale(1);
    }
`;

const LoggedOutToolTipComponent = styled.span`
    width: auto;
    margin: 0.5rem;
    border-radius: 0.375rem;
    min-width: max-content;
    top: 65px;
    padding: 0.5rem;
    margin: 0.5rem;
    background-color: rgb(75 85 99);
    border-radius: 0.375rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    transition-property: all;
    transition-duration: 100ms;
    transform: scale(0);
    transform-origin: top;
    position: absolute;

    ${LoginLogoutButtonWrapper}:hover & {
        transform: scale(1);
    }
`;

const LoggedOutToolTip = () => {
    return <LoggedOutToolTipComponent data-test-id='LoggedOutToolTip'>Login</LoggedOutToolTipComponent>;
};

const LoggedInToolTip = () => {
    return <LoggedInToolTipComponent data-test-id='LoggedInToolTip'>Profile</LoggedInToolTipComponent>;
};

export const LoginLogoutButton = () => {
    const {user} = useContext(AccountContext);
    const navigate = useNavigate();

    const handleLoginNavigation = () => {
        location.pathname.toLowerCase() !== '/login' ? navigate('/login') : navigate(0);
    };

    return (
        <>
            {user && (
                <LoginLogoutButtonWrapper
                    data-test-id={`LoginLogoutButtonWrapper`}
                    onClick={() => navigate('/profile')}
                >
                    <CgProfile size='25' />
                    <LoggedInToolTip />
                </LoginLogoutButtonWrapper>
            )}
            {!user && (
                <LoginLogoutButtonWrapper
                    data-test-id={`LoginLogoutButtonWrapper`}
                    onClick={() => handleLoginNavigation()}
                >
                    <GrLogin size='25' />
                    <LoggedOutToolTip />
                </LoginLogoutButtonWrapper>
            )}
        </>
    );
};

export default LoginLogoutButton;
