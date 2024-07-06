import {useContext, useState} from 'react';
import {AccountContext} from '../../services/Account';
import {CognitoUserAttribute} from 'amazon-cognito-identity-js';
import {styled} from 'styled-components';
import {getFontSize} from '../../utils/layout/getFontSize';
import {breakPoints} from '../../utils/layout/breakpoints';
import {FaEye, FaEyeSlash} from 'react-icons/fa';

const ChangeEmailFormWrapper = styled.div`
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
const ChangeEmailBorder = styled.fieldset`
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

const NewEmailInput = styled.input`
    @media screen and ${breakPoints.mobile} {
        font-size: ${getFontSize(4)};
        margin-bottom: 45px;
        margin-top: 30px;
        max-width: 350px;
    }
    @media screen and ${breakPoints.tabletBig} {
        font-size: ${getFontSize(5)};
        margin-bottom: 0;
    }
`;

const NewPasswordInputWrapper = styled.div`
    display: inline-block;
    position: relative;
`;

const ShowPasswordSpan = styled.span`
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

const NewPasswordInput = styled.input`
    @media screen and ${breakPoints.mobile} {
        font-size: ${getFontSize(4)};
        margin-bottom: 45px;
        margin-top: 30px;
        max-width: 350px;
    }
    @media screen and ${breakPoints.tabletBig} {
        font-size: ${getFontSize(6)};
        margin-bottom: 0;
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

const NewEmailSubmitButton = styled.button`
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
        width: 250px;
        min-height: 60px;
    }
`;

const ChangeEmailForm = () => {
    const [password, setPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorText, setErrorText] = useState<string | null>(null);

    const {getSession, authenticate, logout} = useContext(AccountContext);

    const onSubmit = async event => {
        event.preventDefault();

        getSession().then(({user, email}) => {
            authenticate(email, password)
                .then(() => {
                    const attributes = [new CognitoUserAttribute({Name: 'email', Value: newEmail})];

                    user.updateAttributes(attributes, err => {
                        if (err) {
                            setErrorText(err.message);
                            console.error(err);
                        } else {
                            console.log('Our guest has a new identity');
                            logout();
                        }
                    });
                })
                .catch(e => {
                    setErrorText(e.message); //displays error for wrong password or email
                });
        });
    };

    return (
        <ChangeEmailFormWrapper data-test-id='ChangeEmailFormWrapper'>
            <ChangeEmailBorder data-test-id='ChangeEmailBorder'>
                <StyledLegend>Change Email</StyledLegend>
                <form onSubmit={onSubmit} data-test-id='ChangeEmailForm'>
                    <StyledText>New Email</StyledText>
                    <NewEmailInput
                        data-test-id='NewEmailInput'
                        value={newEmail}
                        type='email'
                        onChange={event => setNewEmail(event.target.value)}
                    ></NewEmailInput>
                    <StyledText>Current Password</StyledText>
                    <NewPasswordInputWrapper>
                        <NewPasswordInput
                            value={password}
                            type={showPassword ? 'text' : 'password'}
                            onChange={event => setPassword(event.target.value)}
                            data-test-id='NewPasswordInput'
                        ></NewPasswordInput>
                        <ShowPasswordSpan
                            onClick={() => setShowPassword(prevState => !prevState)}
                            data-test-id='ShowPasswordToggle'
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </ShowPasswordSpan>
                    </NewPasswordInputWrapper>
                    {errorText && (
                        <div>
                            <StyledErrorMessage data-test-id='ErrorMessage'>{errorText}</StyledErrorMessage>
                        </div>
                    )}
                    <div data-test-id='ButtonWrapper'>
                        <NewEmailSubmitButton type='submit' data-test-id='NewEmailSubmitButton'>
                            Change Email
                        </NewEmailSubmitButton>
                    </div>
                </form>
            </ChangeEmailBorder>
        </ChangeEmailFormWrapper>
    );
};

export default ChangeEmailForm;
