import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';

const ReturnButtonContainer = styled.div``;

const ReturnButton = styled.button`
    min-height: 50px;
    width: 200px;
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

const ReturnHomeButton = () => {
    const navigate = useNavigate();
    const returnHome = () => {
        navigate(`/main`);
    };

    return (
        <ReturnButtonContainer>
            <ReturnButton onClick={returnHome}>Return Home</ReturnButton>
        </ReturnButtonContainer>
    );
};

export default ReturnHomeButton;
