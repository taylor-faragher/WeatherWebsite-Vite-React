import {styled} from 'styled-components';
import {getFontWeight} from '../../utils/layout/getFontWeight';
import {breakPoints} from '../../utils/layout/breakpoints';
import {getFontSize} from '../../utils/layout/getFontSize';
import LoginForm from '../shared/LoginForm';
import {useState} from 'react';
import SignUpForm from '../shared/SignUpForm';
import ForgotPasswordForm from '../shared/ForgotPasswordForm';

const LoginPageWrapper = styled.div`
    padding-bottom: 175px;
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
    const [showForm, setShowForm] = useState('Login');

    const handleSignUpSwitch = () => {
        setShowForm('SignUp');
        setPageTitle('Sign Up');
    };

    const handleLoginSwitch = () => {
        setShowForm('Login');
        setPageTitle('Login');
    };

    const handleForgotPasswordSwitch = () => {
        setShowForm('ForgotPassword');
        setPageTitle('Password Recovery');
    };

    return (
        <LoginPageWrapper data-test-id='LoginPage_LoginPageWrapper'>
            {showSuccessMessage && <SuccessMessage>Sign up Successful! Please login below!</SuccessMessage>}
            <StyledTitle>{pageTitle}</StyledTitle>
            {showForm == 'Login' && (
                <>
                    <LoginForm signUpSwitch={handleSignUpSwitch} forgotPasswordSwitch={handleForgotPasswordSwitch} />
                </>
            )}
            {showForm == 'SignUp' && (
                <>
                    <SignUpForm loginSwitch={handleLoginSwitch} setSuccessMessage={setSuccessSignUp} />
                </>
            )}
            {showForm == 'ForgotPassword' && (
                <>
                    <ForgotPasswordForm loginSwitch={handleLoginSwitch} />
                </>
            )}
        </LoginPageWrapper>
    );
};

export default LoginPage;
