import {styled} from 'styled-components';
import ChangePassword from './ChangePasswordForm';
import ChangeEmail from './ChangeEmailForm';
import {useContext, useEffect, useState} from 'react';
import {AccountContext} from '../../services/Account';
import {useNavigate} from 'react-router-dom';
import {breakPoints} from '../../utils/layout/breakpoints';
import {getFontSize} from '../../utils/layout/getFontSize';

const ProfileWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledLogoutButton = styled.div`
    margin-top: 40px;
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
        font-size: ${getFontSize(6)};
        width: 300px;
        min-height: 100px;
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
            .then(session => {
                console.log('Session: ', session);
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
            <ChangePassword></ChangePassword>
            <ChangeEmail></ChangeEmail>
            <StyledLogoutButton onClick={logout}>Logout</StyledLogoutButton>
        </ProfileWrapper>
    );
};

export default ProfilePage;
