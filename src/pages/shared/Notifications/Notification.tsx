import {useContext, useState} from 'react';
import {NotificationContext} from '../../../services/NotificationProvider';
import {styled} from 'styled-components';
import {getFontSize} from '../../../utils/layout/getFontSize';
import {getFontWeight} from '../../../utils/layout/getFontWeight';
import {breakPoints} from '../../../utils/layout/breakpoints';

const Alert = styled.div<{$toBeDisplayed; $notificationType}>`
    display: ${({$toBeDisplayed}) => ($toBeDisplayed ? 'inline' : 'none')};
    position: absolute;
    font-size: ${getFontSize(3)};
    left: 50%;
    border-radius: 10px;
    transform: translate(-50%, 0);
    z-index: 10;
    text-align: center;
    background-color: ${({$notificationType}) => `${getNotificationBackgroundColor($notificationType)}`};
    color: ${({$notificationType, theme}) => theme.notificationTextColor[$notificationType]};
    margin-bottom: 15px;
    min-width: 200px;
    text-wrap: balance;
    @media screen and ${breakPoints.mobile} {
        top: 3%;
        width: 90%;
        padding-right: 25px;
    }
    @media screen and ${breakPoints.tabletBig} {
        top: 10%;
        width: 40%;
        padding-right: 35px;
    }
`;

const AlertClose = styled.span`
    position: absolute;
    font-weight: ${getFontWeight('bold')};
    font-size: ${getFontSize(5)};
    line-height: 20px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        color: black;
    }
    @media screen and ${breakPoints.mobile} {
        right: 3%;
        top: 10%;
    }
    @media screen and ${breakPoints.tabletBig} {
        right: 2%;
    }
`;

const notificationColorMap = {
    positive: 'green',
    negative: 'red',
    warning: '#ffeb3b',
};

const getNotificationBackgroundColor = value => {
    return notificationColorMap[value];
};

const Notification = () => {
    const [display, setDisplay] = useState(true);
    const {type, text} = useContext(NotificationContext);

    if (type && text) {
        return (
            <Alert $toBeDisplayed={display} $notificationType={type}>
                {text}
                <AlertClose onClick={() => setDisplay(false)}>&times;</AlertClose>
            </Alert>
        );
    } else {
        return <></>;
    }
};

export default Notification;
