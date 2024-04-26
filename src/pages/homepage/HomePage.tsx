import {ChangeEvent, useState} from 'react';
import styled from 'styled-components';
import {validateZipCode} from '../../utils/validateZipCode';
import {useNavigate} from 'react-router-dom';

const ZipCodeColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

const ZipCodeInput = styled.input`
    max-width: 250px;
    border: 0;
    border-bottom: 2px solid #9b9b9b;
    outline: 0;
    font-size: 1.3rem;
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;
`;

const ZipCodeButtonSearch = styled.button`
    min-height: 35px;
    width: 100px;
    margin-top: 20px;
    font: inherit;
    font-size: 1.3rem;
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
    const navigate = useNavigate();
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setZipCode(validateZipCode(event));
    };

    const getWeather = () => {
        navigate(`/result?zipCode=${zipCode}`);
    };

    return (
        <ZipCodeColumn>
            <ZipCodeInput
                maxLength={5}
                value={zipCode}
                id='zipCode'
                placeholder='Enter 5-Digit Zip Code'
                onChange={event => handleChange(event)}
            ></ZipCodeInput>
            <div>
                <ZipCodeButtonSearch onClick={getWeather}>Search</ZipCodeButtonSearch>
            </div>
        </ZipCodeColumn>
    );
};

export default HomePage;
