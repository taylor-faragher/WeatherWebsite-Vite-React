import {styled} from 'styled-components';
import {getFontWeight} from '../../utils/layout/getFontWeight';
import {breakPoints} from '../../utils/layout/breakpoints';
import {getFontSize} from '../../utils/layout/getFontSize';
import LoginForm from '../shared/LoginForm';
import {useState} from 'react';
import SignUpForm from '../shared/SignUpForm';
import ForgotPasswordForm from '../shared/ForgotPasswordForm';

const LoginPageWrapper = styled.div`
    @media screen and ${breakPoints.mobile} {
        padding-bottom: 100px;
    }
    @media screen and ${breakPoints.tabletBig} {
        padding-bottom: 0px;
    }
`;

const SuccessMessage = styled.h1`
    font-size: ${getFontSize(3)};
    color: red;
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

const LoginPage = () => {
    const [pageTitle, setPageTitle] = useState('Login');
    const [showSuccessMessage, setSuccessSignUp] = useState(false);

    const handleSignUpSwitch = () => {
        setSuccessSignUp(false);
        setPageTitle('Sign Up');
    };

    const handleLoginSwitch = () => {
        setSuccessSignUp(false);
        setPageTitle('Login');
    };

    const handleForgotPasswordSwitch = () => {
        setPageTitle('Password Recovery');
    };

    return (
        <LoginPageWrapper data-test-id='LoginPage_LoginPageWrapper'>
            {showSuccessMessage && (
                <SuccessMessage data-test-id='SuccesSignUpMessage'>
                    Sign up Successful! Please login below!
                </SuccessMessage>
            )}
            <StyledTitle>{pageTitle}</StyledTitle>
            {pageTitle == 'Login' && (
                <>
                    <LoginForm signUpSwitch={handleSignUpSwitch} forgotPasswordSwitch={handleForgotPasswordSwitch} />
                </>
            )}
            {pageTitle == 'Sign Up' && (
                <>
                    <SignUpForm loginSwitch={handleLoginSwitch} setSuccessMessage={setSuccessSignUp} />
                </>
            )}
            {pageTitle == 'Password Recovery' && (
                <>
                    <ForgotPasswordForm loginSwitch={handleLoginSwitch} />
                </>
            )}
        </LoginPageWrapper>
    );
};

export default LoginPage;
