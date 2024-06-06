import {useState} from 'react';
import {breakPoints} from '../../utils/layout/breakpoints';
import {getFontSize} from '../../utils/layout/getFontSize';
import {validateZipCodeInput} from '../../utils/validateZipCodeInput';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';

const ZipCodeWrapper = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ZipCodeInput = styled.input`
    border: 0;
    border-bottom: 2px solid ${({theme}) => theme.zipCodeInputColor};
    outline: 0;
    padding: 7px 0;
    text-align: center;
    background: transparent;
    transition: border-color 0.2s;
    color: ${({theme}) => theme.zipCodeInputColor};

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

const ZipCodeButtonSearch = styled.button`
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
        width: 250px;
        min-height: 80px;
    }

    @media screen and ${breakPoints.tabletBig} {
        font-size: ${getFontSize(5)};
        width: 200px;
        min-height: 60px;
    }
`;

const ButtonWrapper = styled.div`
    @media screen and ${breakPoints.tabletBig} {
        display: flex;
        justify-content: center;
        width: 450px;
        margin-bottom: 40px;
    }
`;

type VoidFunctionWithParam = (param: string) => void;

interface ZipCodeFormProps {
    placeHolderText: string;
    setZipCode?: VoidFunctionWithParam;
}

export const ZipCodeForm = (props: ZipCodeFormProps) => {
    const [zipCode, setZipCode] = useState('');
    const [displayError, setDisplayError] = useState(false);
    const navigate = useNavigate();

    const handleChange = event => {
        setZipCode(validateZipCodeInput(event));
    };

    const getWeather = event => {
        event.preventDefault();
        if (zipCode && zipCode.length == 5) {
            if (props.setZipCode) {
                props.setZipCode(zipCode as string);
            }
            navigate(`/result?zipCode=${zipCode}`);
        } else {
            setDisplayError(true);
        }
    };

    return (
        <ZipCodeWrapper data-test-id='ZipCodeForm' onSubmit={e => getWeather(e)}>
            <ZipCodeInput
                maxLength={5}
                value={zipCode}
                id='zipCode'
                placeholder={props.placeHolderText}
                data-test-id='ZipCodeInput'
                onChange={event => handleChange(event)}
            ></ZipCodeInput>
            {displayError && (
                <div>
                    <StyledErrorMessage data-test-id='ErrorMessage'>Please Enter a Valid Zip Code.</StyledErrorMessage>
                </div>
            )}
            <ButtonWrapper data-test-id='ButtonWrapper'>
                <ZipCodeButtonSearch type='submit' data-test-id='ZipCodeButtonSearch'>
                    Search
                </ZipCodeButtonSearch>
            </ButtonWrapper>
        </ZipCodeWrapper>
    );
};
