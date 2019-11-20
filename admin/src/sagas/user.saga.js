import { put, call, takeLatest } from 'redux-saga/effects';
import * as Types from '../constants/user.actiontypes';
import callApi from '../utils/apiCaller';
import { ToastSuccess, ToastError } from '../utils/toaster';

function* fetchUsersSaga() {
    try {
        const users = yield call(() => callApi('users', 'GET', null).then(res => res.sources));
        yield put({ type: Types.FETCH_USERS_SUCCESSED, users });
    } catch (error) {
        yield put({ type: Types.FETCH_USERS_FAILED, message: error.message })
    }
}

function* addUserSaga(action) {
    try {
        yield call(() => callApi('sso', 'POST', action.user))
        ToastSuccess('Add successfully!')
        yield put({ type: Types.FETCH_USERS })
    } catch (error) {
        ToastError(error.response.data)
    }
}

function* updateUserSaga(action) {
    try {
        yield call(() => callApi(`users/${action.user.id}`, 'PUT', action.user))
        ToastSuccess('Update successfully!')
        yield put({ type: Types.FETCH_USERS });
    } catch (error) {
        ToastError(error.response.data)
    }
}

function* deleteUserSaga(action) {
    try {
        yield call(() => callApi(`users/${action.id}`, 'DELETE', null))
        ToastSuccess('Delete successfully!')
        yield put({ type: Types.FETCH_USERS });
    } catch (error) {
        ToastError(error.response.data)
    }
}

export default function* watchUsersSaga() {
    yield takeLatest(Types.FETCH_USERS, fetchUsersSaga);
    yield takeLatest(Types.ADD_USER, addUserSaga);
    yield takeLatest(Types.UPDATE_USER, updateUserSaga);
    yield takeLatest(Types.DELETE_USER, deleteUserSaga);
}