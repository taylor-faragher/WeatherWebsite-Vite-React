import {useContext, useEffect, useState} from 'react';
import {AccountContext} from '../../services/Account';
import {styled} from 'styled-components';
import ChangePassword from './ChangePassword';
import ChangeEmail from './ChangeEmail';
import {useNavigate} from 'react-router-dom';

const ProfileWrapper = styled.div``;

const ProfilePage = () => {
    const navigate = useNavigate();
    const {getSession} = useContext(AccountContext);

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const currentSession = async () => {
            getSession()
                .then(() => {
                    setLoggedIn(true);
                })
                .catch(err => {
                    if (err) {
                        setLoggedIn(false);
                    }
                });
        };
        void currentSession();
        if (!loggedIn) {
            navigate('/');
        }
    }, [getSession, loggedIn, navigate]);

    return (
        <ProfileWrapper>
            <div>
                {loggedIn && (
                    <>
                        <h2>Settings</h2>
                        <ChangePassword></ChangePassword>
                        <ChangeEmail></ChangeEmail>
                    </>
                )}
            </div>
        </ProfileWrapper>
    );
};

export default ProfilePage;
