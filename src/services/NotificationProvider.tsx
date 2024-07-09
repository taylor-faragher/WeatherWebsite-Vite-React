import {createContext, useState} from 'react';

const displayTime = 5000;

type NotificationContextType = {
    popNotification: (type: string, text: string) => void;
    text: string;
    type: NoficationType;
};

export type NoficationType = 'positive' | 'negative' | 'warning' | '';

const NotificationContext = createContext<NotificationContextType>(null!);

const NotificationProvider = ({children}) => {
    const [text, setText] = useState<string>('');
    const [type, setType] = useState<NoficationType>('');

    const popNotification = (text, type) => {
        setText(text);
        setType(type);

        setTimeout(() => {
            setText('');
            setType('');
        }, displayTime);
    };

    return (
        <NotificationContext.Provider value={{popNotification, text, type}}>{children}</NotificationContext.Provider>
    );
};

export {NotificationProvider, NotificationContext};
