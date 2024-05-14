import styled from 'styled-components';
import ReturnHomeButton from '../shared/ReturnHomeButton';

const ErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ErrorText = styled.h1`
    font-weight: 9;
    font-size: 32px;
`;

const ErrorPage = () => {
    return (
        <ErrorContainer>
            <ErrorText data-test-id='Error_ErrorText'>Oh Snap! Sorry about that!</ErrorText>
            <ReturnHomeButton />
        </ErrorContainer>
    );
};

export default ErrorPage;
