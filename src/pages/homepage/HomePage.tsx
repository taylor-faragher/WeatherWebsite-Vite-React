import {useState} from 'react';
import styled from 'styled-components';
import {validateZipCodeInput} from '../../utils/validateZipCodeInput';
import {useNavigate} from 'react-router-dom';
import {validateZipCodeLength} from '../../utils/validateZipCodeLength';
import {breakPoints} from '../../utils/layout/breakpoints';
import {getFontSize} from '../../utils/layout/getFontSize';
import {getFontWeight} from '../../utils/layout/getFontWeight';

const ZipCodeColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

const WelcomeTitle = styled.h1`
    font-weight: ${getFontWeight('heavy')};
    line-height: 1.2;
    text-align: center;
    margin-bottom: 0;

    @media screen and ${breakPoints.mobileBig} {
        font-size: ${getFontSize(12)};
    }
    @media screen and ${breakPoints.tabletBig} {
        font-size: ${getFontSize(9)};
    }
`;

const Title = styled.h1`
    font-weight: 700;
    line-height: 1.2;
    text-align: center;

    @media screen and ${breakPoints.mobileBig} {
        font-size: ${getFontSize(11)};
    }
    @media screen and ${breakPoints.tabletBig} {
        font-size: ${getFontSize(7)};
    }
`;

const ZipCodeForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ZipCodeInput = styled.input`
    border: 0;
    border-bottom: 2px solid #9b9b9b;
    outline: 0;
    padding: 7px 0;
    text-align: center;
    background: transparent;
    transition: border-color 0.2s;

    @media screen and ${breakPoints.mobileBig} {
        font-size: ${getFontSize(11)};
        max-width: 800px;
    }
    @media screen and ${breakPoints.tabletBig} {
        font-size: ${getFontSize(6)};
        max-width: 350px;
    }
`;

const StyledErrorMessage = styled.p`
    @media screen and ${breakPoints.mobileBig} {
        font-size: ${getFontSize(7)};
    }
    @media screen and ${breakPoints.tabletBig} {
        font-size: ${getFontSize(5)};
    }
`;

const ZipCodeButtonSearch = styled.button`
    font: inherit;
    border: 0;
    outline: 0;
    border-radius: 5em;
    &:hover {
        cursor: pointer;
        border: 1px solid #9b9b9b;
    }

    @media screen and ${breakPoints.mobileBig} {
        font-size: ${getFontSize(10)};
        min-height: 200px;
        width: 500px;
        margin-top: 50px;
    }
    @media screen and ${breakPoints.tabletBig} {
        font-size: ${getFontSize(6)};
        min-height: 75px;
        width: 200px;
    }
`;

const HomePage = () => {
    const [zipCode, setZipCode] = useState('');
    const [displayError, setDisplayError] = useState(false);
    const navigate = useNavigate();
    const handleChange = event => {
        setZipCode(validateZipCodeInput(event));
    };

    const getWeather = event => {
        if (validateZipCodeLength(zipCode)) {
            setDisplayError(true);
            event.preventDefault();
        } else {
            navigate(`/result?zipCode=${zipCode}`);
        }
    };

    return (
        <ZipCodeColumn>
            <WelcomeTitle data-test-id='HomePage_WelcomeTitle'>Welcome!</WelcomeTitle>
            <Title data-test-id='HomePage_Title'>Get your current weather below!</Title>
            <ZipCodeForm data-test-id='HomePage_ZipCodeForm' onSubmit={e => getWeather(e)}>
                <ZipCodeInput
                    maxLength={5}
                    value={zipCode}
                    id='zipCode'
                    placeholder='5-Digit Zip Code'
                    data-test-id='HomePage_ZipCodeForm'
                    onChange={event => handleChange(event)}
                ></ZipCodeInput>
                {displayError && (
                    <div>
                        <StyledErrorMessage data-test-id='HomePage_ErrorMessage'>
                            Please Enter a Valid Zip Code.
                        </StyledErrorMessage>
                    </div>
                )}
                <ZipCodeButtonSearch
                    type='submit'
                    data-test-id='HomePage_ZipCodeButtonSearch'
                    onClick={e => getWeather(e)}
                >
                    Search
                </ZipCodeButtonSearch>
            </ZipCodeForm>
        </ZipCodeColumn>
    );
};

export default HomePage;
