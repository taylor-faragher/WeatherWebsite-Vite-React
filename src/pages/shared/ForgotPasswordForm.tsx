import {useState} from 'react';
import UserPool from '../../UserPool';
import {CognitoUser} from 'amazon-cognito-identity-js';
import {Link} from 'react-router-dom';

const ForgotPasswordForm = ({loginSwitch}) => {
    const [email, setEmail] = useState<string>('');
    const [verificationCode, setVerificationCode] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [step, setStep] = useState<number>(1);

    const handleForgotPassword = () => {
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

    const handleResetPassword = () => {
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

    return (
        <>
            <div>
                {step === 1 && (
                    <div>
                        <input
                            type='email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder='Email'
                        />
                        <button onClick={handleForgotPassword}>Send Verification Code</button>
                    </div>
                )}
                {step === 2 && (
                    <div>
                        <h2>Reset Password</h2>
                        <input
                            type='text'
                            value={verificationCode}
                            onChange={e => setVerificationCode(e.target.value)}
                            placeholder='Verification Code'
                        />
                        <input
                            type='password'
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            placeholder='New Password'
                        />
                        <button onClick={handleResetPassword}>Confirm New Password</button>
                    </div>
                )}
                {step === 3 && (
                    <div>
                        <h2>Password Reset Successful</h2>
                        <p>You can now log in with your new password.</p>
                    </div>
                )}
            </div>
            <div>
                Remebered your login?{' '}
                <Link to='#' onClick={loginSwitch}>
                    Login Here!
                </Link>
            </div>
        </>
    );
};

export default ForgotPasswordForm;
