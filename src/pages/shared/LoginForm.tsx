import {useContext, useState} from 'react';
import {AccountContext} from '../../services/Account';
import {breakPoints} from '../../utils/layout/breakpoints';
import {getFontSize} from '../../utils/layout/getFontSize';
import {styled} from 'styled-components';
import {Link} from 'react-router-dom';
import {getFontWeight} from '../../utils/layout/getFontWeight';
import FormButton from './formComponents/FormButton';
import {FaEye, FaEyeSlash} from 'react-icons/fa';

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
        font-size: ${getFontSize(3)};
        margin-bottom: 0;
    }
`;

const PasswordInputWrapper = styled.div`
    display: inline-block;
    position: relative;
`;

const PasswordInput = styled.input`
    paddingright: 30px;
    @media screen and ${breakPoints.mobile} {
        font-size: ${getFontSize(4)};
        margin-bottom: 25px;
        max-width: 350px;
    }
    @media screen and ${breakPoints.tabletBig} {
        font-size: ${getFontSize(3)};
        margin-bottom: 0;
    }
`;

const ShowPasswordSpan = styled.span`
    position: absolute;
    right: 10px;
    color: black;
    transform: translateY(-50%);
    cursor: pointer;
    @media screen and ${breakPoints.mobile} {
        top: 35%;
    }
    @media screen and ${breakPoints.tabletBig} {
        top: 55%;
    }
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

const LinkDiv = styled.div`
    padding-top: 25px;
    font-weight: ${getFontWeight('heavy')};
`;

const LoginForm = ({signUpSwitch, forgotPasswordSwitch}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorText, setErrorText] = useState(null);

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
                console.error('Failed to auth email and password: ', err);
            });
    };

    return (
        <>
            <LoginPageForm onSubmit={e => onSubmit(e)} data-test-id='LoginPage_LoginPageForm'>
                <LoginText data-test-id='LoginPage_EmailLoginText'>Username</LoginText>
                <EmailInput
                    data-test-id='LoginPage_EmailInput'
                    value={email}
                    type='email'
                    placeholder='Email'
                    onChange={event => setEmail(event.target.value)}
                ></EmailInput>
                <LoginText data-test-id='LoginPage_PasswordLoginText'>Password</LoginText>
                <PasswordInputWrapper>
                    <PasswordInput
                        value={password}
                        placeholder='Password'
                        type={showPassword ? 'text' : 'password'}
                        onChange={event => setPassword(event.target.value)}
                        data-test-id='LoginPage_PasswordInput'
                    ></PasswordInput>
                    <ShowPasswordSpan
                        onClick={() => setShowPassword(prevState => !prevState)}
                        data-test-id='ShowPasswordToggle'
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </ShowPasswordSpan>
                </PasswordInputWrapper>
                <FormButton dataTestId='LoginPageFormButton' text='Login' />
                {errorText && (
                    <div>
                        <StyledErrorMessage data-test-id='ErrorMessage'>{errorText}</StyledErrorMessage>
                    </div>
                )}
            </LoginPageForm>
            <LinkDiv data-test-id='SignUpLinkDiv'>
                Don&apos;t have an account?{' '}
                <Link to='#' onClick={signUpSwitch} data-test-id='SignUpLink'>
                    Sign Up!
                </Link>
            </LinkDiv>
            <LinkDiv data-test-id='ForgotPasswordWrapper'>
                Forgot Your Password?{' '}
                <Link to='#' onClick={forgotPasswordSwitch} data-test-id='ForgotPasswordLink'>
                    Click Here to reset!
                </Link>
            </LinkDiv>
        </>
    );
};

export default LoginForm;
