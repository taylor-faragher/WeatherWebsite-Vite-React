import {useContext, useState} from 'react';
import {NotificationContext} from '../../../services/NotificationProvider';
import {styled} from 'styled-components';
import {getFontSize} from '../../../utils/layout/getFontSize';
import {getFontWeight} from '../../../utils/layout/getFontWeight';

const Alert = styled.div<{$toBeDisplayed; $notificationType}>`
    display: ${({$toBeDisplayed}) => ($toBeDisplayed ? 'inline' : 'none')};
    position: absolute;
    font-size: ${getFontSize(4)};
    left: 50%;
    top: 15%;
    border-radius: 10px;
    transform: translate(-50%, 0);
    z-index: 10;
    text-align: center;
    background-color: ${({$notificationType}) => `${getNotificationBackgroundColor($notificationType)}`};
    color: white;
    margin-bottom: 15px;
    min-width: 200px;
`;

const AlertClose = styled.span`
    position: absolute;
    right: 5%;
    top: 20%;
    color: white;
    font-weight: ${getFontWeight('bold')};
    font-size: ${getFontSize(4)};
    line-height: 20px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        color: black;
    }
`;

const notificationColorMap = {
    positive: 'green',
    negative: 'red',
    warning: 'yellow',
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
