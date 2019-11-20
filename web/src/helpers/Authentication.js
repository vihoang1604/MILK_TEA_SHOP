import { store } from '../Store'
import { LOGIN_SUCCESSED } from '../Constants/actionType'
import jwt from 'jsonwebtoken'

export default class Auth {
    static check() {
        let token = localStorage.getItem('_token');
        if (token) {
            store.dispatch({ type: LOGIN_SUCCESSED, token })
            return true
        }
        return false
    }
    static user() {
        let token = localStorage.getItem('_token')
        if (token) {
            store.dispatch({ type: LOGIN_SUCCESSED, token })
            return jwt.decode(token).JwtPayload
        }
        return new Error("Unauthenticated")
    }
    static logout() {
        localStorage.removeItem('_token')
    }
}