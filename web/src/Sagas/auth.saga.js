import CallApi from '../Utils/CallAPI'
import { LOGIN_ENDPOINT, HOMEPAGE, REGISTER_ENDPOINT } from '../Config/config'
import { put, takeEvery, call } from 'redux-saga/effects'
import {
    REGISTER_REQUEST,
    REGISTER_SUCCESSED,
    REGISTER_FAILED,
    LOGIN_SUCCESSED,
    LOGIN_FAILED,
    LOGIN_REQUEST
} from '../Constants/actionType'
import jwt from 'jsonwebtoken'
import { ToastSuccess } from '../Utils/Toastify'

export function* register(action) {
    try {
        const token = yield call(() => CallApi(REGISTER_ENDPOINT, 'POST', action.user)
            .then(res => {
                return res.data;
            }));
        const user = jwt.decode(token).JwtPayload
        localStorage.setItem(`_token`, token)
        yield put({ type: REGISTER_SUCCESSED, token })
        ToastSuccess(`Hi ${user.Name}, Your registration successful!`)
        setTimeout(() => {
            window.location.replace(HOMEPAGE)
        }, 1000)
    } catch (error) {
        yield put({ type: REGISTER_FAILED, message: error.response.data });
    }
}

export function* login(action) {
    const { email, password } = action
    try {
        const token = yield call(() => CallApi(LOGIN_ENDPOINT, 'POST', { email, password })
            .then(res => {
                return res.data
            }));
        const user = jwt.decode(token).JwtPayload
        localStorage.setItem(`_token`, token)
        yield put({ type: LOGIN_SUCCESSED, token })
        ToastSuccess(`Hi ${user.Name}, Sign up successful!`)
        setTimeout(() => {
            window.location.replace(HOMEPAGE)
        }, 1000)
    } catch (error) {
        yield put({ type: LOGIN_FAILED, message: error.response.data })
    }
}

export function* watchUserSaga() {
    yield takeEvery(REGISTER_REQUEST, register)
    yield takeEvery(LOGIN_REQUEST, login)
}