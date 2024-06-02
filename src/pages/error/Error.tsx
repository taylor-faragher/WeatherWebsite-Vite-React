import styled from 'styled-components';
import ReturnHomeButton from '../shared/ReturnHomeButton';

const ErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ErrorText = styled.h1`
    font-weight: 9;
    font-size: 32px;
`;

const ErrorPage = () => {
    return (
        <ErrorContainer data-test-id='ErrorContainer'>
            <ErrorText data-test-id='Error_ErrorText'>Oh Snap! Sorry about that!</ErrorText>
            <ReturnHomeButton data-test-id='ReturnHomeButton' />
        </ErrorContainer>
    );
};

export default ErrorPage;
