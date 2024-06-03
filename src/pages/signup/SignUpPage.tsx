import {useState} from 'react';
import {styled} from 'styled-components';
import UserPool from '../../UserPool';
import {breakPoints} from '../../utils/layout/breakpoints';
import {getFontSize} from '../../utils/layout/getFontSize';
import {useNavigate} from 'react-router-dom';

const SignUpPageWrapper = styled.div``;
const StyledTitle = styled.h1``;
const SignUpPageForm = styled.form``;
const SignUpText = styled.h3``;
const SignUpEmailInput = styled.input``;
const SignUpPasswordInput = styled.input``;
const SignUpButtonWrapper = styled.div`
    padding-top: 25px;
`;
const SignUpButton = styled.button`
    width: 100px;
    height: 30px;
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

const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayError, setDisplayError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const navigate = useNavigate();

    const onSubmit = event => {
        event.preventDefault();
        UserPool.signUp(email, password, [], [], (err, data) => {
            if (err) {
                console.log('Signup error: ', err);
                setErrorText(err.message);
                setDisplayError(true);
            }
            navigate('/login');
            console.log(data);
        });
    };

    return (
        <SignUpPageWrapper data-test-id='SignUpPageWrapper'>
            <StyledTitle>Sign Up</StyledTitle>
            <SignUpPageForm onSubmit={onSubmit} data-test-id='SignUpPageForm'>
                <SignUpText data-test-id='SignUpTextUsername'>Username</SignUpText>
                <SignUpEmailInput
                    data-test-id='SignUpEmailInput'
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                ></SignUpEmailInput>
                <SignUpText data-test-id='SignUpTextPassword'>Password</SignUpText>
                <SignUpPasswordInput
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    data-test-id='SignUpPasswordInput'
                ></SignUpPasswordInput>
                <SignUpButtonWrapper>
                    <SignUpButton type='submit' data-test-id='SignUpButton'>
                        Signup
                    </SignUpButton>
                </SignUpButtonWrapper>
                {displayError && (
                    <div>
                        <StyledErrorMessage data-test-id='ErrorMessage'>{errorText}</StyledErrorMessage>
                    </div>
                )}
            </SignUpPageForm>
        </SignUpPageWrapper>
    );
};

export default SignUpPage;
