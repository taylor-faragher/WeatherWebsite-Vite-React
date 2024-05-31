import {useState, useContext, useEffect} from 'react';
import {AccountContext} from '../../services/Account';

const Status = () => {
    const [status, setStatus] = useState(false);

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
    });

    return <div>{status ? <button onClick={logout}>Logout</button> : 'Please Login'}</div>;
};

export default Status;
