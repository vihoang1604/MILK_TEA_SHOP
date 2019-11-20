import * as Type from '../Constants/actionType'
import jwt from 'jsonwebtoken'

var initialState = {
    user: {},
    logingIn: false,
    isAuthenticated: false,
    message: '',
    signingUp: false
};

const authReducer = (state = initialState, action) => {
    let user = {};
    switch (action.type) {
        case Type.LOGIN_REQUEST:
            return Object.assign({}, state, {
                logingIn: true,
                isAuthenticated: false,
                message: ''
            });
        case Type.LOGIN_SUCCESSED:
            user = jwt.decode(action.token).JwtPayload
            return Object.assign({}, state, {
                logingIn: false,
                isAuthenticated: true,
                user,
                message: ''
            });
        case Type.LOGIN_FAILED:
            return Object.assign({}, state, {
                logingIn: false,
                isAuthenticated: false,
                message: action.message
            });
        case Type.REGISTER_REQUEST:
            return Object.assign({}, state, {
                signingUp: true,
                message: ''
            });
        case Type.REGISTER_SUCCESSED:
            user = jwt.decode(action.token).JwtPayload
            return Object.assign({}, state, {
                signingUp: false,
                user,
                message: ''
            });
        case Type.REGISTER_FAILED:
            return Object.assign({}, state, {
                signingUp: false,
                message: action.message
            });
        default: return state;
    }
};
export default authReducer;