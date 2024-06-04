import {useState} from 'react';
import {breakPoints} from '../../utils/layout/breakpoints';
import {getFontSize} from '../../utils/layout/getFontSize';
import {styled} from 'styled-components';
import {Link, useNavigate} from 'react-router-dom';
import UserPool from '../../UserPool';
import {getFontWeight} from '../../utils/layout/getFontWeight';

const SignUpPageForm = styled.form``;

const SignUpText = styled.h3`
    @media screen and ${breakPoints.mobile} {
        font-size: ${getFontSize(5)};
        margin: 0;
    }
    @media screen and ${breakPoints.tablet} {
        font-size: ${getFontSize(5)};
        padding-bottom: 10px;
        padding-top: 20px;
    }
`;

const SignUpEmailInput = styled.input`
    @media screen and ${breakPoints.mobile} {
        font-size: ${getFontSize(4)};
        margin-bottom: 25px;
        margin-top: 30px;
        max-width: 350px;
    }
    @media screen and ${breakPoints.tabletBig} {
        font-size: ${getFontSize(4)};
        margin-bottom: 0;
    }
`;

const SignUpPasswordInput = styled.input`
    @media screen and ${breakPoints.mobile} {
        font-size: ${getFontSize(4)};
        margin-bottom: 25px;
        margin-top: 30px;
        max-width: 350px;
    }
    @media screen and ${breakPoints.tabletBig} {
        font-size: ${getFontSize(4)};
        margin-bottom: 0;
    }
`;

const SignUpButtonWrapper = styled.div`
    padding-top: 25px;
`;

const SignUpButton = styled.button`
    @media screen and ${breakPoints.mobile} {
        font-size: ${getFontSize(6)};
        width: 200px;
        height: 60px;
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

const SignUpDiv = styled.div`
    padding-top: 35px;
    font-weight: ${getFontWeight('heavy')};
`;
const SignUpForm = ({loginSwitch}) => {
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
            } else {
                navigate('/login');
                console.log(data);
            }
        });
    };
    return (
        <>
            <SignUpPageForm onSubmit={onSubmit} data-test-id='SignUpPageForm'>
                <SignUpText data-test-id='SignUpTextUsername'>Username</SignUpText>
                <SignUpEmailInput
                    data-test-id='SignUpEmailInput'
                    value={email}
                    type='text'
                    onChange={event => setEmail(event.target.value)}
                ></SignUpEmailInput>
                <SignUpText data-test-id='SignUpTextPassword'>Password</SignUpText>
                <SignUpPasswordInput
                    value={password}
                    type='password'
                    onChange={event => setPassword(event.target.value)}
                    data-test-id='SignUpPasswordInput'
                ></SignUpPasswordInput>
                <SignUpButtonWrapper>
                    <SignUpButton type='submit' data-test-id='SignUpButton'>
                        Sign Up
                    </SignUpButton>
                </SignUpButtonWrapper>
                {displayError && (
                    <div>
                        <StyledErrorMessage data-test-id='ErrorMessage'>{errorText}</StyledErrorMessage>
                    </div>
                )}
            </SignUpPageForm>
            <SignUpDiv>
                Already have an account?
                <Link to='#' onClick={loginSwitch}>
                    Login!
                </Link>
            </SignUpDiv>
        </>
    );
};

export default SignUpForm;
