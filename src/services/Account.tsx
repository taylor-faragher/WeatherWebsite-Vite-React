/* eslint-disable @typescript-eslint/no-explicit-any */
import {createContext} from 'react';
import {CognitoUser, AuthenticationDetails, CognitoUserSession} from 'amazon-cognito-identity-js';
import Pool from '../UserPool';

type AccountContext = {
    authenticate: (Username: any, Password: any) => Promise<unknown>;
    getSession: () => Promise<unknown>;
    logout: () => void;
};

const AccountContext = createContext<AccountContext>(null!);

const Account = ({children}) => {
    const getSession = async (): Promise<CognitoUserSession> => {
        return await new Promise<CognitoUserSession>((resolve, reject) => {
            const user = Pool.getCurrentUser();
            if (user) {
                user.getSession((err, session) => {
                    if (err) {
                        reject();
                    } else {
                        resolve(session);
                    }
                });
            } else {
                reject();
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
        }
    };

    return <AccountContext.Provider value={{authenticate, getSession, logout}}>{children}</AccountContext.Provider>;
};

export {Account, AccountContext};
