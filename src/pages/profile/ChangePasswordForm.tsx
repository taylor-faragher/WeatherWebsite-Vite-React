import {useContext, useState} from 'react';
import {AccountContext} from '../../services/Account';
import {styled} from 'styled-components';
import {getFontSize} from '../../utils/layout/getFontSize';
import {breakPoints} from '../../utils/layout/breakpoints';

const ChangePasswordFormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 25px;
    width: 100%;
    max-width: 800px;
`;

const ChangePasswordBorder = styled.fieldset`
    width: 100%;
    max-width: 800px;
`;

const StyledLegend = styled.legend`
    font-size: ${getFontSize(5)};
`;

const ChangePasswordForm = styled.form``;

const StyledText = styled.h3`
    margin: 0;
    padding-top: 25px;
`;

const OldPasswordInput = styled.input`
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
        font-size: ${getFontSize(6)};
        width: 300px;
        min-height: 100px;
    }

    @media screen and ${breakPoints.tabletBig} {
        font-size: ${getFontSize(5)};
        width: 300px;
        min-height: 60px;
    }
`;

export default () => {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const {getSession} = useContext(AccountContext);

    const onSubmit = event => {
        event.preventDefault();

        getSession().then(({user}) => {
            user.changePassword(password, newPassword, (err, result) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(result);
                }
            });
        });
    };

    return (
        <ChangePasswordFormWrapper>
            <ChangePasswordBorder>
                <StyledLegend>Change Email</StyledLegend>
                <ChangePasswordForm onSubmit={onSubmit}>
                    <StyledText>Current password</StyledText>
                    <OldPasswordInput
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    ></OldPasswordInput>
                    <StyledText>New password</StyledText>
                    <NewPasswordInput
                        value={newPassword}
                        onChange={event => setNewPassword(event.target.value)}
                    ></NewPasswordInput>
                    <ButtonWrapper>
                        <NewPasswordSubmitButton type='submit'>Change Password</NewPasswordSubmitButton>
                    </ButtonWrapper>
                </ChangePasswordForm>
            </ChangePasswordBorder>
        </ChangePasswordFormWrapper>
    );
};
