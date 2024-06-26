import {ReactElement} from 'react';
import {NavigateFunction, useNavigate} from 'react-router-dom';
import styled from 'styled-components';

const HeaderIconWrapper = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    height: 3rem;
    width: 3rem;
    cursor: pointer;
    background-color: ${({theme}) => theme.headerIconBackgroundColor};
    border: 2px solid ${({theme}) => theme.toggleBorder};
    border-radius: 2rem;
    transition-property: all;
    transition-duration: 300ms;
    color: ${({theme}) => theme.headerIconColor};
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

const navigateToPath = (path: string, navigate: NavigateFunction) => {
    return path.startsWith('https') ? (window.location.href = `${path}`) : navigate(path);
};

type HeaderIconProps = {
    icon: ReactElement;
    toolTipText: string;
    path: string;
    testId?: string;
};

export const HeaderIcon = (props: HeaderIconProps) => {
    const navigate = useNavigate();
    return (
        <HeaderIconWrapper
            data-test-id={`HeaderIcon_${props.testId}`}
            onClick={() => navigateToPath(props.path, navigate)}
        >
            {props.icon}
            <HeaderTooltip data-test-id='HeaderToolTip'>{props.toolTipText}</HeaderTooltip>
        </HeaderIconWrapper>
    );
};
