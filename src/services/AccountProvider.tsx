/* eslint-disable @typescript-eslint/no-explicit-any */
import {createContext, useContext} from 'react';
import {CognitoUser, AuthenticationDetails, CognitoUserSession} from 'amazon-cognito-identity-js';
import Pool from './UserPool';
import {NotificationContext} from './NotificationProvider';
import {useNavigate} from 'react-router-dom';

interface UserAttributes {
    [key: string]: string;
}

interface SessionWithUser extends CognitoUserSession {
    user: any;
    email: string;
    attributes: UserAttributes;
}

type AccountContextType = {
    authenticate: (Username: any, Password: any) => Promise<unknown>;
    getSession: () => Promise<SessionWithUser>;
    logout: () => void;
};

const AccountContext = createContext<AccountContextType>(null!);

const AccountProvider = ({children}) => {
    const {popNotification} = useContext(NotificationContext);
    const navigate = useNavigate();

    const getCurrentUser = async () => {
        try {
            const user = Pool.getCurrentUser();
            if (user) {
                setIsLoggedIn(true);
                setUser(user);
            } else {
                setIsLoggedIn(false);
                setUser(null);
            }
        } catch (error) {
            throw new Error();
        }
    };

    useEffect(() => {
        getCurrentUser();
    }, []);

    const getSession = async (): Promise<SessionWithUser> => {
        return await new Promise<SessionWithUser>((resolve, reject) => {
            const user = Pool.getCurrentUser();
            if (user) {
                user.getSession(async (err, session) => {
                    if (err) {
                        reject(new Error('Failed to find Current Session'));
                    } else {
                        const attributes: UserAttributes = await new Promise((resolve, reject) => {
                            user.getUserAttributes((err, attributes) => {
                                if (err) {
                                    reject(new Error('Failed to get User Attributes'));
                                } else {
                                    const results = {};
                                    if (attributes) {
                                        for (const attribute of attributes) {
                                            const {Name, Value} = attribute;
                                            results[Name] = Value;
                                        }
                                        resolve(results);
                                    }
                                }
                            });
                        });
                        resolve({user, ...session, ...(attributes as object)});
                    }
                });
            } else {
                reject(new Error('Failed to find Current User'));
            }
        });
    };

    const authenticate = async (Username, Password) => {
        return await new Promise((resolve, reject) => {
            const user = new CognitoUser({
                Username,
                Pool,
            });

            const authDetails = new AuthenticationDetails({
                Username,
                Password,
            });

            user.authenticateUser(authDetails, {
                onSuccess: data => {
                    resolve(data);
                },
                onFailure: err => {
                    reject(err);
                },
                newPasswordRequired: data => {
                    console.log('newPasswordRequired: ', data);
                    resolve(data);
                },
            });
        });
    };

    const logout = () => {
        const user = Pool.getCurrentUser();
        if (user) {
            user.signOut();
            console.log('Our guest has left. They will be missed.');
            popNotification('Logged out!', 'positive');
            navigate('/');
        }
    };

    return <AccountContext.Provider value={{getSession, authenticate, logout}}>{children}</AccountContext.Provider>;
};

export {AccountProvider, AccountContext};
