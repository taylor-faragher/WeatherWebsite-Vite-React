import {useContext, useEffect, useState} from 'react';
import {AccountContext} from '../../services/Account';
import ChangePassword from './ChangePassword';
import ChangeEmail from './ChangeEmail';

export default () => {
    const {getSession} = useContext(AccountContext);

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        getSession()
            .then(() => {
                setLoggedIn(true);
            })
            .catch(err => {
                if (err) {
                    setLoggedIn(false);
                }
            });
    }, [getSession]);

    return (
        <div>
            {loggedIn && (
                <>
                    <h2>Settings</h2>
                    <ChangePassword></ChangePassword>
                    <ChangeEmail></ChangeEmail>
                </>
            )}
        </div>
    );
};
