import {useContext, useState} from 'react';
import {styled} from 'styled-components';
import {AccountContext} from '../../services/Account';
import useLoginStatus from '../../hooks/useLoginStatus';
import {Link} from 'react-router-dom';
import {getFontWeight} from '../../utils/layout/getFontWeight';
import {breakPoints} from '../../utils/layout/breakpoints';
import {getFontSize} from '../../utils/layout/getFontSize';

const LoginPageWrapper = styled.div`
    padding-bottom: 175px;
`;

const StyledTitle = styled.h1`
    font-weight: ${getFontWeight('heavy')};
    line-height: 1.2;
    text-align: center;
    margin-bottom: 20px;

    @media screen and ${breakPoints.mobile} {
        font-size: ${getFontSize(7)};
    }
    @media screen and ${breakPoints.tabletBig} {
        font-size: ${getFontSize(9)};
    }
`;

const LoginPageForm = styled.form``;
const LoginText = styled.h3`
    @media screen and ${breakPoints.mobile} {
        font-size: ${getFontSize(5)};
        margin: 0;
    }
    @media screen and ${breakPoints.tablet} {
        font-size: ${getFontSize(5)};
        padding-bottom: 10px;
        padding-top: 20px;
    }
`;

const EmailInput = styled.input`
    @media screen and ${breakPoints.mobile} {
        font-size: ${getFontSize(4)};
        margin-bottom: 25px;
        margin-top: 15px;
        max-width: 350px;
    }
    @media screen and ${breakPoints.tabletBig} {
        font-size: ${getFontSize(4)};
        margin-bottom: 0;
    }
`;

const PasswordInput = styled.input`
    @media screen and ${breakPoints.mobile} {
        font-size: ${getFontSize(4)};
        margin-bottom: 25px;
        margin-top: 15px;
        max-width: 350px;
    }
    @media screen and ${breakPoints.tabletBig} {
        font-size: ${getFontSize(4)};
        margin-bottom: 0;
    }
`;

const LoginButton = styled.button`
    @media screen and ${breakPoints.mobile} {
        font-size: ${getFontSize(6)};
        width: 200px;
        height: 60px;
    }
`;
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

    const {authenticate} = useContext(AccountContext);

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
        </LoginPageWrapper>
    );
};

export default LoginPage;
