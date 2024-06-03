import {useContext, useState} from 'react';
import {styled} from 'styled-components';
import {AccountContext} from '../../services/Account';
import useLoginStatus from '../../hooks/useLoginStatus';
import {Link} from 'react-router-dom';

const LoginPageWrapper = styled.div``;
const LoginPageForm = styled.form``;
const LoginText = styled.h3``;
const EmailInput = styled.input``;
const PasswordInput = styled.input``;
const SignUpButton = styled.button``;
const LogoutButtonWrapper = styled.div``;

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const status = useLoginStatus();

    const {authenticate, logout} = useContext(AccountContext);

    const onSubmit = event => {
        event.preventDefault();
        authenticate(email, password)
            .then(data => {
                console.log('Logged in!', data);
                window.location.href = `/main`;
            })
            .catch(err => {
                console.error('Failed to auth email and password: ', err);
            });
    };

    return (
        <LoginPageWrapper data-test-id='LoginPage_LoginPageWrapper'>
            {status && (
                <>
                    <LoginPageForm onSubmit={e => onSubmit(e)} data-test-id='LoginPage_LoginPageForm'>
                        <LoginText data-test-id='LoginPage_LoginText'>Username</LoginText>
                        <EmailInput
                            data-test-id='LoginPage_EmailInput'
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        ></EmailInput>
                        <LoginText data-test-id='LoginPage_LoginText'>Password</LoginText>
                        <PasswordInput
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            data-test-id='LoginPage_PasswordInput'
                        ></PasswordInput>
                        <SignUpButton data-test-id='LoginPage_SignUpButton' type='submit'>
                            Login
                        </SignUpButton>
                    </LoginPageForm>
                    <div>
                        Don&apos;t have an account? <Link to={'/signup'}> Sign Up!</Link>
                    </div>
                </>
            )}
            {!status && (
                <LogoutButtonWrapper data-test-id='LoginPage_LogoutButtonWrapper'>
                    <button onClick={logout}>Logout</button>
                </LogoutButtonWrapper>
            )}
        </LoginPageWrapper>
    );
};

export default LoginPage;
