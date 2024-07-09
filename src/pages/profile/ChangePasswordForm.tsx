import {useContext, useState} from 'react';
import {AccountContext} from '../../services/AccountProvider';
import {styled} from 'styled-components';
import {getFontSize} from '../../utils/layout/getFontSize';
import {breakPoints} from '../../utils/layout/breakpoints';
import {FaEye, FaEyeSlash} from 'react-icons/fa';

const ChangePasswordFormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 800px;
    @media screen and ${breakPoints.mobile} {
        padding-top: 50px;
    }
    @media screen and ${breakPoints.tablet} {
        padding-top: 25px;
    }
`;

const ChangePasswordBorder = styled.fieldset`
    max-width: 800px;
    @media screen and ${breakPoints.mobile} {
        padding-top: 50px;
        width: 75%;
    }
    @media screen and ${breakPoints.tabletBig} {
        padding-top: 0px;
        width: 100%;
    }
`;

const StyledLegend = styled.legend`
    @media screen and ${breakPoints.mobile} {
        font-size: ${getFontSize(4)};
    }
`;

const StyledText = styled.h3`
    margin: 0;
`;

const OldPasswordInputWrapper = styled.div`
    display: inline-block;
    position: relative;
`;

const OldPasswordInput = styled.input`
    @media screen and ${breakPoints.mobile} {
        font-size: ${getFontSize(4)};
        margin-bottom: 45px;
        margin-top: 30px;
        max-width: 350px;
    }
    @media screen and ${breakPoints.tabletBig} {
        font-size: ${getFontSize(3)};
        margin-bottom: 0;
        width: 350px;
        height: 45px;
    }
`;

const NewPasswordInputWrapper = styled.div`
    display: inline-block;
    position: relative;
`;

const NewPasswordInput = styled.input`
    @media screen and ${breakPoints.mobile} {
        font-size: ${getFontSize(4)};
        margin-bottom: 45px;
        margin-top: 30px;
        max-width: 350px;
    }
    @media screen and ${breakPoints.tabletBig} {
        font-size: ${getFontSize(5)};
        margin-bottom: 0;
        width: 350px;
        height: 45px;
    }
`;

const ShowNewPasswordSpan = styled.span`
    position: absolute;
    right: 10px;
    color: black;
    transform: translateY(-50%);
    cursor: pointer;
    @media screen and ${breakPoints.mobile} {
        top: 45%;
    }
    @media screen and ${breakPoints.tabletBig} {
        top: 70%;
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

const NewPasswordSubmitButton = styled.button`
    margin-top: 20px;
    border: 0;
    outline: 0;
    color: black;
    border-radius: 5em;
    background-color: lightgrey;
    &:hover {
        cursor: pointer;
        border: 1px solid #9b9b9b;
    }
    @media screen and ${breakPoints.mobile} {
        font-size: ${getFontSize(4)};
        width: 250px;
        min-height: 65px;
    }

    @media screen and ${breakPoints.tabletBig} {
        font-size: ${getFontSize(5)};
        width: 300px;
        min-height: 60px;
    }
`;

const ChangePasswordForm = () => {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const {logout} = useContext(AccountContext);
    const [errorText, setErrorText] = useState(null);

    const {getSession} = useContext(AccountContext);

    const onSubmit = event => {
        event.preventDefault();

        getSession().then(({user}) => {
            user.changePassword(password, newPassword, err => {
                if (err) {
                    setErrorText(err.message);
                    console.error(err);
                } else {
                    logout();
                }
            });
        });
    };

    return (
        <ChangePasswordFormWrapper data-test-id='ChangePasswordFormWrapper'>
            <ChangePasswordBorder data-test-id='ChangePasswordBorder'>
                <StyledLegend>Change Password</StyledLegend>
                <form onSubmit={onSubmit} data-test-id='ChangePasswordForm'>
                    <StyledText>Current password</StyledText>
                    <OldPasswordInputWrapper>
                        <OldPasswordInput
                            value={password}
                            type={showOldPassword ? 'text' : 'password'}
                            onChange={event => setPassword(event.target.value)}
                            data-test-id='OldPasswordInput'
                        ></OldPasswordInput>
                        <ShowNewPasswordSpan
                            onClick={() => setShowOldPassword(prevState => !prevState)}
                            data-test-id='ShowPasswordToggle'
                        >
                            {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                        </ShowNewPasswordSpan>
                    </OldPasswordInputWrapper>
                    <StyledText>New password</StyledText>
                    <NewPasswordInputWrapper>
                        <NewPasswordInput
                            value={newPassword}
                            type={showNewPassword ? 'text' : 'password'}
                            onChange={event => setNewPassword(event.target.value)}
                            data-test-id='NewPasswordInput'
                        ></NewPasswordInput>
                        <ShowNewPasswordSpan
                            onClick={() => setShowNewPassword(prevState => !prevState)}
                            data-test-id='ShowPasswordToggle'
                        >
                            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                        </ShowNewPasswordSpan>
                    </NewPasswordInputWrapper>
                    {errorText && (
                        <div>
                            <StyledErrorMessage data-test-id='ErrorMessage'>{errorText}</StyledErrorMessage>
                        </div>
                    )}
                    <div data-test-id='ButtonWrapper'>
                        <NewPasswordSubmitButton type='submit' data-test-id='NewPasswordSubmitButton'>
                            Change Password
                        </NewPasswordSubmitButton>
                    </div>
                </form>
            </ChangePasswordBorder>
        </ChangePasswordFormWrapper>
    );
};

export default ChangePasswordForm;
