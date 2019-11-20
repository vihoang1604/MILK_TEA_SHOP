import * as Types from '../constants/user.actiontypes';

const initialState = {
    fetching: false,
    fetched: false,
    users: [],
    error: false,
    message: ''
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_USERS:
            return Object.assign({}, state, {
                fetching: true,
                fetched: false,
                error: false
            });
        case Types.FETCH_USERS_SUCCESSED:
            return Object.assign({}, state, {
                fetching: false,
                fetched: true,
                error: false,
                users: action.users
            });
        case Types.FETCH_USERS_FAILED:
            return Object.assign({}, state, {
                fetching: false,
                fetched: true,
                error: true,
                message: action.message
            });
        default:
            return state
    }
}
