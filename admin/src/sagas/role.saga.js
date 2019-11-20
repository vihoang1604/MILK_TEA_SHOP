import { put, call, takeLatest } from 'redux-saga/effects';
import * as Types from '../constants/role.actiontypes';
import callApi from '../utils/apiCaller';
import { ToastSuccess, ToastError } from '../utils/toaster';

function* fetchRolesSaga() {
    try {
        const roles = yield call(() => callApi('roles', 'GET', null).then(res => res.sources));
        yield put({ type: Types.FETCH_ROLES_SUCCESSED, roles });
    } catch (error) {
        yield put({ type: Types.FETCH_ROLES_FAILED, message: error.message })
    }
}

function* addRoleSaga(action) {
    try {
        yield call(() => callApi('roles', 'POST', action.role))
        ToastSuccess('Add successfully!')
        yield put({ type: Types.FETCH_ROLES })
    } catch (error) {
        ToastError(error.response.data.message)
    }
}

function* updateRoleSaga(action) {
    try {
        yield call(() => callApi(`roles/${action.category.id}`, 'PUT', action.role))
        ToastSuccess('Update successfully!')
        yield put({ type: Types.FETCH_ROLES });
    } catch (error) {
        ToastError(error.message)
    }
}

function* deleteRoleSaga(action) {
    try {
        yield call(() => callApi(`roles/${action.id}`, 'DELETE', null))
        ToastSuccess('Delete successfully!')
        yield put({ type: Types.FETCH_ROLES });
    } catch (error) {
        ToastError(error.message)
    }
}

export default function* watchRolesSaga() {
    yield takeLatest(Types.FETCH_ROLES, fetchRolesSaga);
    yield takeLatest(Types.ADD_ROLE, addRoleSaga);
    yield takeLatest(Types.UPDATE_ROLE, updateRoleSaga);
    yield takeLatest(Types.DELETE_ROLE, deleteRoleSaga);
}
