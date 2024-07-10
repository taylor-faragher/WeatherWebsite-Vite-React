import {useContext, useState} from 'react';
import {breakPoints} from '../../utils/layout/breakpoints';
import {getFontSize} from '../../utils/layout/getFontSize';
import {styled} from 'styled-components';
import {Link} from 'react-router-dom';
import UserPool from '../../services/UserPool';
import {getFontWeight} from '../../utils/layout/getFontWeight';
import FormButton from './formComponents/FormButton';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import PasswordChecker from './PasswordChecker';
import {CharacterType} from 'src/types/types';
import {
    checkPasswordForNumber,
    checkPasswordForSpecialCharacter,
    checkPasswordForUpperCase,
    checkPasswordLength,
} from '../../utils/PasswordRequirementUtils';
import {NotificationContext} from '../../services/NotificationProvider';

const SignUpPageForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SignUpText = styled.h3`
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

const SignUpEmailInput = styled.input`
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

const LoginDiv = styled.div`
    padding-top: 35px;
    font-weight: ${getFontWeight('heavy')};
`;

const SignUpForm = ({loginSwitch}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordLength, setPasswordLength] = useState<CharacterType>('none');
    const [passwordUpperCase, setPasswordUpperCase] = useState<CharacterType>('none');
    const [passwordNumber, setPasswordNumber] = useState<CharacterType>('none');
    const [passwordSpecialCharacter, setPasswordSpecialCharacter] = useState<CharacterType>('none');
    const {popNotification} = useContext(NotificationContext);

    const onSubmit = event => {
        event.preventDefault();
        if (!password) {
            popNotification('You Need to Enter a Password', 'warning');
            return;
        }
        if (
            passwordLength == 'incorrect' ||
            passwordNumber == 'incorrect' ||
            passwordUpperCase == 'incorrect' ||
            passwordSpecialCharacter == 'incorrect'
        ) {
            popNotification('Password does not meet requirements. Please see password criteria below. ', 'negative');
        } else {
            UserPool.signUp(email, password, [], [], err => {
                if (err) {
                    popNotification(err.message, 'negative');
                } else {
                    loginSwitch();
                    popNotification(
                        'Sign up Successful! Please check your email for confirmation instructions ',
                        'positive'
                    );
                }
            });
        }
    };

    const checkPasswordAndSet = async value => {
        const checkPasswordLengthValue: CharacterType = await checkPasswordLength(value);
        const checkPasswordForNumberValue: CharacterType = await checkPasswordForNumber(value);
        const checkPasswordForUpperCaseValue: CharacterType = await checkPasswordForUpperCase(value);
        const checkPasswordForSpecialCharacterValue: CharacterType = await checkPasswordForSpecialCharacter(value);
        setPasswordLength(checkPasswordLengthValue);
        setPasswordUpperCase(checkPasswordForUpperCaseValue);
        setPasswordNumber(checkPasswordForNumberValue);
        setPasswordSpecialCharacter(checkPasswordForSpecialCharacterValue);
        setPassword(value);
    };

    return (
        <>
            <SignUpPageForm onSubmit={onSubmit} data-test-id='SignUpPageForm'>
                <SignUpText data-test-id='SignUpTextUsername'>Username</SignUpText>
                <SignUpEmailInput
                    data-test-id='SignUpEmailInput'
                    value={email}
                    type='email'
                    placeholder='Email'
                    onChange={event => setEmail(event.target.value)}
                ></SignUpEmailInput>
                <SignUpText data-test-id='SignUpTextPassword'>Password</SignUpText>
                <PasswordInputWrapper>
                    <PasswordInput
                        value={password}
                        placeholder='Password'
                        type={showPassword ? 'text' : 'password'}
                        onChange={event => checkPasswordAndSet(event.target.value)}
                        data-test-id='SignUpForm_PasswordInput'
                    ></PasswordInput>
                    <ShowPasswordSpan
                        data-test-id='ShowPassword'
                        onClick={() => setShowPassword(prevState => !prevState)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </ShowPasswordSpan>
                </PasswordInputWrapper>
                <PasswordChecker
                    lengthType={passwordLength}
                    upperCaseType={passwordUpperCase}
                    numberType={passwordNumber}
                    specialCharacterType={passwordSpecialCharacter}
                />
                <FormButton dataTestId='SignUpButton' text='Sign Up' />
            </SignUpPageForm>
            <LoginDiv data-test-id='LoginDiv'>
                Already have an account?{' '}
                <Link to='#' onClick={loginSwitch} data-test-id='LoginLink'>
                    Login!
                </Link>
            </LoginDiv>
        </>
    );
};

export default SignUpForm;
