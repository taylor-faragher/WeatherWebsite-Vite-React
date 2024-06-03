import {useContext, useState} from 'react';
import {AccountContext} from '../../services/Account';
import {CognitoUserAttribute} from 'amazon-cognito-identity-js';
import {styled} from 'styled-components';
import {getFontSize} from '../../utils/layout/getFontSize';
import {breakPoints} from '../../utils/layout/breakpoints';

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
    padding-top: 25px;
`;

const ChangeEmailForm = styled.form``;

const NewEmailInput = styled.input`
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

const ButtonWrapper = styled.div``;

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
        font-size: ${getFontSize(5)};
        width: 250px;
        min-height: 65px;
    }

    @media screen and ${breakPoints.tabletBig} {
        font-size: ${getFontSize(5)};
        width: 250px;
        min-height: 60px;
    }
`;

export default () => {
    const [password, setPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');

    const {getSession, authenticate} = useContext(AccountContext);

    const onSubmit = event => {
        event.preventDefault();

        getSession().then(({user, email}) => {
            authenticate(email, password).then(() => {
                const attributes = [new CognitoUserAttribute({Name: 'email', Value: newEmail})];

                user.updateAttributes(attributes, (err, results) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(results);
                    }
                });
            });
        });
    };

    return (
        <ChangeEmailFormWrapper data-test-id='ChangeEmailFormWrapper'>
            <ChangeEmailBorder data-test-id='ChangeEmailBorder'>
                <StyledLegend>Change Email</StyledLegend>
                <ChangeEmailForm onSubmit={onSubmit} data-test-id='ChangeEmailForm'>
                    <StyledText>New Email</StyledText>
                    <NewEmailInput
                        data-test-id='NewEmailInput'
                        value={newEmail}
                        onChange={event => setNewEmail(event.target.value)}
                    ></NewEmailInput>
                    <StyledText>Current Password</StyledText>
                    <NewPasswordInput
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        data-test-id='NewPasswordInput'
                    ></NewPasswordInput>
                    <ButtonWrapper data-test-id='ButtonWrapper'>
                        <NewEmailSubmitButton type='submit' data-test-id='NewEmailSubmitButton'>
                            Change Email
                        </NewEmailSubmitButton>
                    </ButtonWrapper>
                </ChangeEmailForm>
            </ChangeEmailBorder>
        </ChangeEmailFormWrapper>
    );
};
