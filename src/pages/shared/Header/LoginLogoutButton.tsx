import {styled} from 'styled-components';
import {GrLogin} from 'react-icons/gr';
import {CgProfile} from 'react-icons/cg';
import useLoginStatus from '../../../hooks/useLoginStatus';

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

const navigateToPath = (path: string): void => {
    window.location.href = `${path}`;
};

const LoggedOutToolTip = () => {
    return <LoggedOutToolTipComponent data-test-id='LoggedOutToolTip'>Login</LoggedOutToolTipComponent>;
};

const LoggedInToolTip = () => {
    return <LoggedInToolTipComponent data-test-id='LoggedInToolTip'>Profile</LoggedInToolTipComponent>;
};

export const LoginLogoutButton = () => {
    const status = useLoginStatus();

    const loginText = status ? <LoggedInToolTip /> : <LoggedOutToolTip />;
    const loginIcon = status ? <CgProfile size='25' /> : <GrLogin size='25' />;
    const loginPath = status ? '/profile' : '/login';

    return (
        <LoginLogoutButtonWrapper data-test-id={`LoginLogoutButtonWrapper`} onClick={() => navigateToPath(loginPath)}>
            {loginIcon}
            {loginText}
        </LoginLogoutButtonWrapper>
    );
};

export default LoginLogoutButton;
