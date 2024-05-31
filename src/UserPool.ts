import {CognitoUserPool} from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'us-east-1_dbPG7AUx8',
    ClientId: '2uu0pjvrs5l12tljij3gagduca',
};
export default new CognitoUserPool(poolData);
