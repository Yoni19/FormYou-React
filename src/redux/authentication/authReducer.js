import { AUTHENTICATION_SUCCESS } from './authTypes';

const initialState = {
    user: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATION_SUCCESS:
            return {
                ...state,
                id: action.id,
                attributes: action.attributes,
                user: action.user
            }
        default:
            return state;
    }
}

export default authReducer;