import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {breakPoints} from '../../utils/layout/breakpoints';
import {getFontSize} from '../../utils/layout/getFontSize';

const ReturnButtonContainer = styled.div``;

const ReturnButton = styled.button`
    margin-top: 20px;
    border: 0;
    outline: 0;
    border-radius: 5em;
    &:hover {
        cursor: pointer;
        border: 1px solid #9b9b9b;
    }
    @media screen and ${breakPoints.mobileBig} {
        font-size: ${getFontSize(9)};
        width: 550px;
        min-height: 200px;
    }

    @media screen and ${breakPoints.tabletBig} {
        font-size: ${getFontSize(5)};
        width: 300px;
        min-height: 75px;
    }
`;

const ReturnHomeButton = () => {
    const navigate = useNavigate();
    const returnHome = () => {
        navigate(`/main`);
    };

    return (
        <ReturnButtonContainer>
            <ReturnButton data-test-id='ReturnButton' onClick={returnHome}>
                Return Home
            </ReturnButton>
        </ReturnButtonContainer>
    );
};

export default ReturnHomeButton;
