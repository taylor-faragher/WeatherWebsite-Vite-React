import {useState} from 'react';
import UserPool from '../../UserPool';
import {CognitoUser} from 'amazon-cognito-identity-js';
import {Link, useNavigate} from 'react-router-dom';
import {styled} from 'styled-components';
import {getFontWeight} from '../../utils/layout/getFontWeight';
import {breakPoints} from '../../utils/layout/breakpoints';
import {getFontSize} from '../../utils/layout/getFontSize';

const ForgotPasswordPageForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LinkDiv = styled.div`
    padding-top: 25px;
    font-weight: ${getFontWeight('heavy')};
`;

const StyledInput = styled.input`
    @media screen and ${breakPoints.mobile} {
        font-size: ${getFontSize(4)};
        margin-bottom: 25px;
        margin-top: 15px;
        max-width: 350px;
    }
    @media screen and ${breakPoints.tabletBig} {
        font-size: ${getFontSize(4)};
        margin-bottom: 25px;
    }
`;

const StyledVerificationButton = styled.button`
    @media screen and ${breakPoints.mobile} {
        font-size: ${getFontSize(4)};
        width: 250px;
        height: 60px;
    }
    @media screen and ${breakPoints.tablet} {
        font-size: ${getFontSize(4)};
        width: 300px;
        height: 50px;
    }
`;

const ForgotPasswordForm = ({loginSwitch}) => {
    const [email, setEmail] = useState<string>('');
    const [verificationCode, setVerificationCode] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [step, setStep] = useState<number>(1);
    const navigate = useNavigate();

    const handleForgotPassword = event => {
        event.preventDefault();
        const userData = {
            Username: email,
            Pool: UserPool,
        };

        const cognitoUser = new CognitoUser(userData);

        cognitoUser.forgotPassword({
            onSuccess: data => {
                console.log('Code sent: ', data);
                setStep(2);
            },
            onFailure: err => {
                console.error(err.message || JSON.stringify(err));
            },
        });
    };

    const handleResetPassword = event => {
        event.preventDefault();
        const userData = {
            Username: email,
            Pool: UserPool,
        };

        const cognitoUser = new CognitoUser(userData);

        cognitoUser.confirmPassword(verificationCode, newPassword, {
            onSuccess: () => {
                console.log('Password confirmed!');
                setStep(3);
            },
            onFailure: err => {
                console.error(err.message || JSON.stringify(err));
            },
        });
    };

    const handleLoginNav = () => {
        navigate(0);
    };

    return (
        <>
            <ForgotPasswordPageForm data-test-id='ForgotPasswordPageForm'>
                {step === 1 && (
                    <StyledForm onSubmit={e => handleForgotPassword(e)} data-test-id='VerificationCodeInputWrapper'>
                        <StyledInput
                            type='email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder='Email'
                        />
                        <StyledVerificationButton data-test-id='SendVerificationCodeButton' type='submit'>
                            Send Verification Code
                        </StyledVerificationButton>
                    </StyledForm>
                )}
                {step === 2 && (
                    <div>
                        <h2>Please Check Email for Verification Code</h2>
                        <StyledForm onSubmit={e => handleResetPassword(e)}>
                            <StyledInput
                                type='text'
                                value={verificationCode}
                                onChange={e => setVerificationCode(e.target.value)}
                                placeholder='Verification Code'
                            />
                            <StyledInput
                                type='password'
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                                placeholder='New Password'
                            />
                            <StyledVerificationButton onClick={handleResetPassword}>
                                Confirm New Password
                            </StyledVerificationButton>
                        </StyledForm>
                    </div>
                )}
                {step === 3 && (
                    <div>
                        <h2>Password Reset Successful</h2>
                        <p>You can now log in with your new password.</p>
                        <button onClick={handleLoginNav}>Login</button>
                    </div>
                )}
            </ForgotPasswordPageForm>
            {step !== 3 && (
                <LinkDiv data-test-id='LoginLinkWrapper'>
                    Remebered your login?{' '}
                    <Link to='#' onClick={loginSwitch} data-test-id='LoginLink'>
                        Login Here!
                    </Link>
                </LinkDiv>
            )}
        </>
    );
};

export default ForgotPasswordForm;
