import * as Types from '../constants/role.actiontypes';

const initialState = {
    fetching: false,
    fetched: false,
    roles: [],
    error: false,
    message: ''
};

export const roleReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_ROLES:
            return Object.assign({}, state, {
                fetching: true,
                fetched: false,
                error: false
            });
        case Types.FETCH_ROLES_SUCCESSED:
            return Object.assign({}, state, {
                fetching: false,
                fetched: true,
                error: false,
                roles: action.roles
            });
        case Types.FETCH_ROLES_FAILED:
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
