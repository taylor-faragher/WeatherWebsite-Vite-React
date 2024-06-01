import {styled} from 'styled-components';
import ChangePassword from './ChangePassword';
import ChangeEmail from './ChangeEmail';
import {useContext, useEffect, useState} from 'react';
import {AccountContext} from '../../services/Account';
import {useNavigate} from 'react-router-dom';

const ProfileWrapper = styled.div``;
const LogoutButtonWrapper = styled.div``;

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
        <ProfileWrapper>
            <>
                <h2>Settings</h2>
                <ChangePassword></ChangePassword>
                <ChangeEmail></ChangeEmail>
                <LogoutButtonWrapper>
                    <button onClick={logout}>Logout</button>
                </LogoutButtonWrapper>
            </>
        </ProfileWrapper>
    );
};

export default ProfilePage;
