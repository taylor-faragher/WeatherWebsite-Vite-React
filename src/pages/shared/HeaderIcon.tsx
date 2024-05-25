import styled from 'styled-components';

const HeaderIconWrapper = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    height: 3rem;
    width: 3rem;
    cursor: pointer;
    background-color: rgb(156 163 175);
    margin-right: auto;
    margin-left: auto;
    background-color: grey;
    border-radius: 1.5rem;
    transition-property: all;
    transition-duration: 300ms;
    color: rgb(34 197 94);
    &:hover {
        border-radius: 0.5rem;
        background-color: rgb(22 163 74);
        color: rgb(255 255 255);
    }
`;

const HeaderTooltip = styled.span`
    position: absolute;
    width: auto;
    margin: 0.5rem;
    border-radius: 0.375rem;
    min-width: max-content;
    top: 50px;
    padding: 0.5rem;
    margin: 0.5rem;
    background-color: rgb(75 85 99);
    border-radius: 0.375rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    transition-property: all;
    transition-duration: 100ms;
    transform: scale(0);
    transform-origin: top;

    ${HeaderIconWrapper}:hover & {
        transform: scale(1);
    }
`;

const navigateToPath = (path: string): void => {
    window.location.href = `${path}`;
};

export const HeaderIcon = ({icon, text, path}) => (
    <HeaderIconWrapper data-test-id='HeaderIcon' onClick={() => navigateToPath(path)}>
        {icon}
        <HeaderTooltip data-test-id='HeaderToolTip'>{text}</HeaderTooltip>
    </HeaderIconWrapper>
);
