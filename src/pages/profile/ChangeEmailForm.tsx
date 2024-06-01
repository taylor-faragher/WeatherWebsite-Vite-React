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
    padding-top: 25px;
    width: 100%;
    max-width: 800px;
`;
const ChangeEmailBorder = styled.fieldset`
    width: 100%;
    max-width: 800px;
`;

const StyledLegend = styled.legend`
    font-size: ${getFontSize(5)};
`;

const StyledText = styled.h3`
    margin: 0;
    padding-top: 25px;
`;

const ChangeEmailForm = styled.form``;

const NewEmailInput = styled.input`
    @media screen and ${breakPoints.mobile} {
        font-size: ${getFontSize(6)};
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
        font-size: ${getFontSize(6)};
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
        font-size: ${getFontSize(6)};
        width: 300px;
        min-height: 100px;
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
        <ChangeEmailFormWrapper>
            <ChangeEmailBorder>
                <StyledLegend>Change Email</StyledLegend>
                <ChangeEmailForm onSubmit={onSubmit}>
                    <StyledText>New Email</StyledText>
                    <NewEmailInput value={newEmail} onChange={event => setNewEmail(event.target.value)}></NewEmailInput>
                    <StyledText>Current password</StyledText>
                    <NewPasswordInput
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    ></NewPasswordInput>
                    <ButtonWrapper>
                        <NewEmailSubmitButton type='submit'>Change Email</NewEmailSubmitButton>
                    </ButtonWrapper>
                </ChangeEmailForm>
            </ChangeEmailBorder>
        </ChangeEmailFormWrapper>
    );
};
