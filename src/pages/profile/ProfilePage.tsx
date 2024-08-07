import {styled} from 'styled-components';
import ChangePassword from './ChangePasswordForm';
import ChangeEmail from './ChangeEmailForm';
import {useContext, useEffect, useState} from 'react';
import {AccountContext} from '../../services/AccountProvider';
import {useNavigate} from 'react-router-dom';
import {breakPoints} from '../../utils/layout/breakpoints';
import {getFontSize} from '../../utils/layout/getFontSize';

const ProfileWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 100%;
    @media screen and ${breakPoints.mobile} {
        padding-bottom: 100px;
    }
    @media screen and ${breakPoints.tablet} {
        padding-top: 75px;
    }
`;

const StyledLogoutButton = styled.div`
    margin-top: 10px;
    border: 0;
    outline: 0;
    color: black;
    border-radius: 5em;
    background-color: lightgrey;
    &:hover {
        cursor: pointer;
        border: 1px solid #9b9b9b;
    }
    @media screen and ${breakPoints.mobile} {
        font-size: ${getFontSize(7)};
        width: 250px;
        min-height: 75px;
    }

    @media screen and ${breakPoints.tabletBig} {
        font-size: ${getFontSize(5)};
        width: 200px;
        min-height: 60px;
    }
`;

const ProfilePage = () => {
    const [status, setStatus] = useState<boolean | null>(null);
    const navigate = useNavigate();
    const {getSession, logout} = useContext(AccountContext);

    useEffect(() => {
        getSession()
            .then(() => {
                setStatus(true);
            })
            .catch(err => {
                if (err) {
                    setStatus(false);
                }
            });
    }, [getSession]);

    useEffect(() => {
        if (status === false) {
            navigate('/login');
        }
    }, [status, navigate]);

    if (status === null) {
        return <div>Loading...</div>;
    }

    return (
        <ProfileWrapper data-test-id='ProfileWrapper'>
            <h2>Profile Settings</h2>
            <StyledLogoutButton data-test-id='LogoutButton' onClick={logout}>
                Logout
            </StyledLogoutButton>
            <ChangePassword></ChangePassword>
            <ChangeEmail></ChangeEmail>
        </ProfileWrapper>
    );
};

export default ProfilePage;
