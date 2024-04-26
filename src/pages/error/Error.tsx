import styled from 'styled-components';

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
        <ErrorContainer>
            <ErrorText>Oh Snap!</ErrorText>
        </ErrorContainer>
    );
};

export default ErrorPage;
