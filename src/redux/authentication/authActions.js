import { AUTHENTICATION_SUCCESS, AUTHENTICATION_FAILED, LOAD_ACCOUNT, LOGOUT_SUCCESS } from './authTypes';

export const authSuccess = (response) => {
    return {
        type: AUTHENTICATION_SUCCESS,
        id: response.data.id,
        attributes: response.data.attributes,
        user: response
    };
};