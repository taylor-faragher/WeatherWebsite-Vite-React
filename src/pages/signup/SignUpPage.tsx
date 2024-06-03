import {useState} from 'react';
import {styled} from 'styled-components';
import UserPool from '../../UserPool';

const SignUpPageWrapper = styled.div``;
const SignUpPageForm = styled.form``;
const SignUpText = styled.h3``;
const SignUpEmailInput = styled.input``;
const SignUpPasswordInput = styled.input``;
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
        <SignUpPageWrapper data-test-id='SignUpPageWrapper'>
            <SignUpPageForm onSubmit={onSubmit} data-test-id='SignUpPageForm'>
                <SignUpText data-test-id='SignUpTextUsername'>Username</SignUpText>
                <SignUpEmailInput
                    data-test-id='SignUpEmailInput'
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                ></SignUpEmailInput>
                <SignUpText data-test-id='SignUpTextPassword'>Password</SignUpText>
                <SignUpPasswordInput
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    data-test-id='SignUpPasswordInput'
                ></SignUpPasswordInput>
                <SignUpButton type='submit' data-test-id='SignUpButton'>
                    Signup
                </SignUpButton>
            </SignUpPageForm>
        </SignUpPageWrapper>
    );
};

export default SignUpPage;
