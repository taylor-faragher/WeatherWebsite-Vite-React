import {CharacterType} from 'src/types/types';
import {styled} from 'styled-components';

const PasswordCheckerWrapper = styled.div`
    text-align: left;
`;

const PasswordUnorderedList = styled.ul`
    padding-left: 0;
`;

const StyledPasswordLengthCheck = styled.li<{$characterType: CharacterType}>`
    color: ${({$characterType}) => `${getTextColor($characterType)}`};
    list-style-type: none;

    &::before {
        content: ${({$characterType}) => `"${getUnicodeCharacter($characterType)}"`};
        font-size: 0.75em;
        line-height: 1;
        padding-right: 5px;
    }
`;

const StyledUpperCaseCheck = styled.li<{$characterType: CharacterType}>`
    list-style-type: none;
    color: ${({$characterType}) => `${getTextColor($characterType)}`};

    &::before {
        content: ${({$characterType}) => `"${getUnicodeCharacter($characterType)}"`};
        font-size: 0.75em;
        line-height: 1;
        padding-right: 5px;
    }
`;

const StyledNumberCheck = styled.li<{$characterType: CharacterType}>`
    list-style-type: none;
    color: ${({$characterType}) => `${getTextColor($characterType)}`};

    &::before {
        content: ${({$characterType}) => `"${getUnicodeCharacter($characterType)}"`};
        font-size: 0.75em;
        line-height: 1;
        padding-right: 5px;
    }
`;

const StyledSpecialCharacterCheck = styled.li<{$characterType: CharacterType}>`
    list-style-type: none;
    color: ${({$characterType}) => `${getTextColor($characterType)}`};

    &::before {
        content: ${({$characterType}) => `"${getUnicodeCharacter($characterType)}"`};
        font-size: 0.75em;
        line-height: 1;
        padding-right: 5px;
    }
`;

const unicodeMap = {
    none: '\u25CF',
    correct: '\u2705',
    incorrect: '\u274C',
};

const textColorMap = {
    none: 'inherit',
    correct: 'green',
    incorrect: 'red',
};

const getUnicodeCharacter = value => {
    return unicodeMap[value];
};

const getTextColor = value => {
    return textColorMap[value];
};

type PasswordCheckerProps = {
    lengthType: CharacterType;
    upperCaseType: CharacterType;
    numberType: CharacterType;
    specialCharacterType: CharacterType;
};

const PasswordChecker = (props: PasswordCheckerProps) => {
    return (
        <PasswordCheckerWrapper data-test-id='PasswordCheckerWrapper'>
            <p>Password must contain: </p>
            <PasswordUnorderedList>
                <StyledPasswordLengthCheck $characterType={props.lengthType}>
                    Eight or more Characters
                </StyledPasswordLengthCheck>
                <StyledUpperCaseCheck $characterType={props.upperCaseType}>One Uppercase Letter</StyledUpperCaseCheck>
                <StyledNumberCheck $characterType={props.numberType}>A number</StyledNumberCheck>
                <StyledSpecialCharacterCheck $characterType={props.specialCharacterType}>
                    A Special Character
                </StyledSpecialCharacterCheck>
            </PasswordUnorderedList>
        </PasswordCheckerWrapper>
    );
};

export default PasswordChecker;
