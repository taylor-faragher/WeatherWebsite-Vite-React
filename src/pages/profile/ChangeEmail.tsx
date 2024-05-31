import {useContext, useState} from 'react';
import {AccountContext} from '../../services/Account';
import {CognitoUserAttribute} from 'amazon-cognito-identity-js';

export default () => {
    const [password, setPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');

    const {getSession, authenticate} = useContext(AccountContext);

    const onSubmit = event => {
        event.preventDefault();

        getSession().then(({user, email}) => {
            authenticate(email, password).then(() => {
                const attributes = [new CognitoUserAttribute({Name: 'email', Value: newEmail})];

                user.updateAttributes(attributes, (err, results) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(results);
                    }
                });
            });
        });
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>New Email</label>
                <input value={newEmail} onChange={event => setNewEmail(event.target.value)}></input>
                <label>Current password</label>
                <input value={password} onChange={event => setPassword(event.target.value)}></input>
                <button type='submit'>Change Password</button>
            </form>
        </div>
    );
};
