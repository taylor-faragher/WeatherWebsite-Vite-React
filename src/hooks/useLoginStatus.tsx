import {useState, useContext, useEffect} from 'react';
import {AccountContext} from '../services/Account';

const useLoginStatus = () => {
    const [status, setStatus] = useState(false);

    const {getSession} = useContext(AccountContext);

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

    return status;
};

export default useLoginStatus;
