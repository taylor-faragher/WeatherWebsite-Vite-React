import {useState} from 'react';
import styled from 'styled-components';
import {validateZipCodeInput} from '../../utils/validateZipCodeInput';
import {useNavigate} from 'react-router-dom';
import {validateZipCodeLength} from '../../utils/validateZipCodeLength';

const ZipCodeColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

const Title = styled.h1`
    font-weight: 700;
    line-height: 1.2;
    text-align: center;
`;

const ZipCodeForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ZipCodeInput = styled.input`
    max-width: 300px;
    border: 0;
    border-bottom: 2px solid #9b9b9b;
    outline: 0;
    font-size: 1.7rem;
    padding: 7px 0;
    text-align: center;
    background: transparent;
    transition: border-color 0.2s;
`;

const StyledErrorMessage = styled.p`
    font-size: 1.7rem;
`;

const ZipCodeButtonSearch = styled.button`
    min-height: 50px;
    width: 150px;
    margin-top: 20px;
    font: inherit;
    font-size: 1.7rem;
    border: 0;
    outline: 0;
    border-radius: 5em;
    &:hover {
        cursor: pointer;
        border: 1px solid #9b9b9b;
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
            <Title>Welcome! Get your current weather below!</Title>
            <ZipCodeForm onSubmit={e => getWeather(e)}>
                <ZipCodeInput
                    maxLength={5}
                    value={zipCode}
                    id='zipCode'
                    placeholder='Enter 5-Digit Zip Code'
                    onChange={event => handleChange(event)}
                ></ZipCodeInput>
                {displayError && (
                    <div>
                        <StyledErrorMessage>Please Enter a Valid Zip Code.</StyledErrorMessage>
                    </div>
                )}
                <ZipCodeButtonSearch type='submit' onClick={e => getWeather(e)}>
                    Search
                </ZipCodeButtonSearch>
            </ZipCodeForm>
        </ZipCodeColumn>
    );
};

export default HomePage;
