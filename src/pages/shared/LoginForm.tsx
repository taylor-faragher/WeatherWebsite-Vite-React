import {useContext, useState} from 'react';
import {AccountContext} from '../../services/AccountProvider';
import {breakPoints} from '../../utils/layout/breakpoints';
import {getFontSize} from '../../utils/layout/getFontSize';
import {styled} from 'styled-components';
import {Link, useNavigate} from 'react-router-dom';
import {getFontWeight} from '../../utils/layout/getFontWeight';
import FormButton from './formComponents/FormButton';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import {Loader} from '../shared/Loader';
import {NotificationContext} from '../../services/NotificationProvider';

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

const LinkDiv = styled.div`
    padding-top: 25px;
    font-weight: ${getFontWeight('heavy')};
`;

const LoginForm = ({signUpSwitch, forgotPasswordSwitch}) => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const {popNotification} = useContext(NotificationContext);
    const {authenticate} = useContext(AccountContext);

    const onSubmit = event => {
        console.log('Someone knocks at the door.');
        event.preventDefault();
        setIsLoggingIn(true);
        authenticate(email, password)
            .then(() => {
                console.log('We recognise our guest and let them in');
                popNotification('Logged In!', 'positive');
                navigate('main');
            })
            .catch(err => {
                setIsLoggingIn(false);
                popNotification('Please check your email and confirm account first.', 'warning');
                console.error('We do not know them and turn them away: ', err.message);
            });
    };

    return (
        <>
            {isLoggingIn && (
                <div>
                    <Loader />
                </div>
            )}
            {!isLoggingIn && (
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
            )}
        </>
    );
};

export default LoginForm;
