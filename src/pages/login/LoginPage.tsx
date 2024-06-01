import {useContext, useState} from 'react';
import {styled} from 'styled-components';
import {AccountContext} from '../../services/Account';
import useLoginStatus from '../../hooks/useLoginStatus';
import {Link, useNavigate} from 'react-router-dom';

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
    const navigate = useNavigate();

    const {authenticate, logout} = useContext(AccountContext);

    const onSubmit = event => {
        event.preventDefault();
        authenticate(email, password)
            .then(data => {
                console.log('Logged in!', data);
                navigate('/main');
            })
            .catch(err => {
                console.error('Failed to auth email and password: ', err);
            });
    };

    return (
        <LoginPageWrapper>
            {!status && (
                <>
                    <LoginPageForm onSubmit={e => onSubmit(e)}>
                        <LoginText>Username</LoginText>
                        <EmailInput value={email} onChange={event => setEmail(event.target.value)}></EmailInput>
                        <LoginText>Password</LoginText>
                        <PasswordInput
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        ></PasswordInput>
                        <SignUpButton type='submit'>Login</SignUpButton>
                    </LoginPageForm>
                    <div>
                        Don&apos;t have an account? <Link to={'/signup'}> Sign Up!</Link>
                    </div>
                </>
            )}
            {status && (
                <LogoutButtonWrapper>
                    <button onClick={logout}>Logout</button>
                </LogoutButtonWrapper>
            )}
        </LoginPageWrapper>
    );
};

export default LoginPage;
