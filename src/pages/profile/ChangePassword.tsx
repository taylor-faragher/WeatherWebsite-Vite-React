import {useContext, useState} from 'react';
import {AccountContext} from '../../services/Account';

export default () => {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const {getSession} = useContext(AccountContext);

    const onSubmit = event => {
        event.preventDefault();

        getSession().then(({user}) => {
            user.changePassword(password, newPassword, (err, result) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(result);
                }
            });
        });
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>Current password</label>
                <input value={password} onChange={event => setPassword(event.target.value)}></input>
                <label>New password</label>
                <input value={newPassword} onChange={event => setNewPassword(event.target.value)}></input>
                <button type='submit'>Change Password</button>
            </form>
        </div>
    );
};
