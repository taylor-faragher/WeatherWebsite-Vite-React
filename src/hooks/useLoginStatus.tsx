import {useState, useContext, useEffect} from 'react';
import {AccountContext} from '../services/Account';

const useLoginStatus = () => {
    const [status, setStatus] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const {getSession} = useContext(AccountContext);

    useEffect(() => {
        getSession()
            .then(session => {
                console.log('Session: ', session);
                setStatus(true);
                setLoaded(true);
            })
            .catch(err => {
                if (err) {
                    setStatus(false);
                }
            });
    }, [getSession]);

    return {status: status, loaded: loaded};
};

export default useLoginStatus;
