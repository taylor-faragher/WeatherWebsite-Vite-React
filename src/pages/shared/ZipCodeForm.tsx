import {useState} from 'react';
import {breakPoints} from '../../utils/layout/breakpoints';
import {getFontSize} from '../../utils/layout/getFontSize';
import {validateZipCodeInput} from '../../utils/validateZipCodeInput';
import {validateZipCodeLength} from '../../utils/validateZipCodeLength';
import styled from 'styled-components';

const ZipCodeWrapper = styled.form`
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
    border-radius: 5em;
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
    pageNavigation: VoidFunctionWithParam;
}

export const ZipCodeForm = (props: ZipCodeFormProps) => {
    const [zipCode, setZipCode] = useState('');
    const [displayError, setDisplayError] = useState(false);

    const handleChange = event => {
        setZipCode(validateZipCodeInput(event));
    };

    const getWeather = event => {
        event.preventDefault();
        if (validateZipCodeLength(zipCode)) {
            setDisplayError(true);
        } else {
            props.pageNavigation(zipCode);
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
