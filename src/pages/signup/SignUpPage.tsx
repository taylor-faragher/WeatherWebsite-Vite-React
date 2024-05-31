import {useState} from 'react';
import {styled} from 'styled-components';
import UserPool from '../../UserPool';

const LoginPageWrapper = styled.div``;
const LoginPageForm = styled.form``;
const LoginText = styled.h3``;
const EmailInput = styled.input``;
const PasswordInput = styled.input``;
const SignUpButton = styled.button``;

const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = event => {
        event.preventDefault();
        UserPool.signUp(email, password, [], [], (err, data) => {
            if (err) {
                console.log('Signup error: ', err);
            }
            console.log(data);
        });
    };

    return (
        <LoginPageWrapper>
            <LoginPageForm onSubmit={onSubmit}>
                <LoginText>Username</LoginText>
                <EmailInput value={email} onChange={event => setEmail(event.target.value)}></EmailInput>
                <LoginText>Password</LoginText>
                <PasswordInput value={password} onChange={event => setPassword(event.target.value)}></PasswordInput>
                <SignUpButton type='submit'>Signup</SignUpButton>
            </LoginPageForm>
        </LoginPageWrapper>
    );
};

export default SignUpPage;
