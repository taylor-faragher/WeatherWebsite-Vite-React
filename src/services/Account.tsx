/* eslint-disable @typescript-eslint/no-explicit-any */
import {createContext, useEffect, useState} from 'react';
import {CognitoUser, AuthenticationDetails, CognitoUserSession} from 'amazon-cognito-identity-js';
import Pool from '../UserPool';

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
    user: CognitoUser | null;
};

const AccountContext = createContext<AccountContextType>(null!);

const Account = ({children}) => {
    const [user, setUser] = useState<CognitoUser | null>(null);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const currentUser = await Pool.getCurrentUser();
                setUser(currentUser);
            } catch (error) {
                setUser(null);
            }
        };

        checkUser();
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
                    console.log('onSuccess: ', data);
                    resolve(data);
                },
                onFailure: err => {
                    console.error('onFailure: ', err);
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
            console.log('User was logged out');
            window.location.href = `/`;
        }
    };

    return (
        <AccountContext.Provider value={{getSession, authenticate, logout, user}}>{children}</AccountContext.Provider>
    );
};

export {Account, AccountContext};
