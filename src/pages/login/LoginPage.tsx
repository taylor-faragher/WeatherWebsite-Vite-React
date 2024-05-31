import {useContext, useState} from 'react';
import {styled} from 'styled-components';
import {AccountContext} from '../../services/Account';
import Settings from '../shared/Settings';
import Status from '../../hooks/useLoginStatus';

const LoginPageWrapper = styled.div``;
const LoginPageForm = styled.form``;
const LoginText = styled.h3``;
const EmailInput = styled.input``;
const PasswordInput = styled.input``;
const SignUpButton = styled.button``;

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {authenticate} = useContext(AccountContext);

    const onSubmit = event => {
        event.preventDefault();
        authenticate(email, password)
            .then(data => {
                console.log('Logged in!', data);
            })
            .catch(err => {
                console.error('Failed to auth email and password: ', err);
            });
    };

    return (
        <LoginPageWrapper>
            <Status />
            <Settings />
            <LoginPageForm onSubmit={e => onSubmit(e)}>
                <LoginText>Username</LoginText>
                <EmailInput value={email} onChange={event => setEmail(event.target.value)}></EmailInput>
                <LoginText>Password</LoginText>
                <PasswordInput value={password} onChange={event => setPassword(event.target.value)}></PasswordInput>
                <SignUpButton type='submit'>Login</SignUpButton>
            </LoginPageForm>
        </LoginPageWrapper>
    );
};

export default LoginPage;
