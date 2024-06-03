import {useContext, useState} from 'react';
import {styled} from 'styled-components';
import {AccountContext} from '../../services/Account';
import useLoginStatus from '../../hooks/useLoginStatus';
import {Link} from 'react-router-dom';
import {getFontWeight} from '../../utils/layout/getFontWeight';
import {breakPoints} from '../../utils/layout/breakpoints';
import {getFontSize} from '../../utils/layout/getFontSize';

const LoginPageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const StyledTitle = styled.h1``;
const LoginPageForm = styled.form``;
const LoginText = styled.h3``;
const EmailInput = styled.input``;
const PasswordInput = styled.input``;
const LoginButton = styled.button`
    width: 100px;
    height: 30px;
`;
const LogoutButtonWrapper = styled.div``;
const LoginButtonWrapper = styled.div`
    padding-top: 25px;
`;
const SignUpDiv = styled.div`
    padding-top: 35px;
    font-weight: ${getFontWeight('heavy')};
`;

const StyledErrorMessage = styled.div`
    color: red;
    @media screen and ${breakPoints.mobile} {
        font-size: ${getFontSize(4)};
    }
    @media screen and ${breakPoints.tabletBig} {
        font-size: ${getFontSize(4)};
        margin: 20px 0 0 0;
    }
`;

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayError, setDisplayError] = useState(false);
    const [errorText, setErrorText] = useState('');
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
                setErrorText(err.message);
                setDisplayError(true);
                console.error('Failed to auth email and password: ', err);
            });
    };

    return (
        <LoginPageWrapper data-test-id='LoginPage_LoginPageWrapper'>
            <StyledTitle>Login Page</StyledTitle>
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
                        <LoginButtonWrapper>
                            <LoginButton data-test-id='LoginPage_SignUpButton' type='submit'>
                                Login
                            </LoginButton>
                        </LoginButtonWrapper>
                        {displayError && (
                            <div>
                                <StyledErrorMessage data-test-id='ErrorMessage'>{errorText}</StyledErrorMessage>
                            </div>
                        )}
                    </LoginPageForm>
                    <SignUpDiv>
                        Don&apos;t have an account? <Link to={'/signup'}> Sign Up!</Link>
                    </SignUpDiv>
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
