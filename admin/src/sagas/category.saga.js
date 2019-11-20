import { put, call, takeLatest } from 'redux-saga/effects';
import * as Types from '../constants/category.actiontypes';
import callApi from '../utils/apiCaller';
import { ToastSuccess, ToastError } from '../utils/toaster';

function* fetchCategoriesSaga() {
    try {
        const categories = yield call(() => callApi('categories', 'GET', null).then(res => res.sources));
        yield put({ type: Types.FETCH_CATEGORIES_SUCCESSED, categories });
    } catch (error) {
        yield put({ type: Types.FETCH_CATEGORIES_FAILED, message: error.response.data })
    }
}

function* addCategorySaga(action) {
    try {
        yield call(() => callApi('categories', 'POST', action.category))
        ToastSuccess('Add successfully!')
        yield put({ type: Types.FETCH_CATEGORIES })
    } catch (error) {
        ToastError(error.response.data)
    }
}

function* updateCategorySaga(action) {
    try {
        yield call(() => callApi(`categories/${action.category.id}`, 'PUT', action.category))
        ToastSuccess('Update successfully!')
        yield put({ type: Types.FETCH_CATEGORIES });
    } catch (error) {
        ToastError(error.response.data)
    }
}

function* deleteCategorySaga(action) {
    try {
        yield call(() => callApi(`categories/${action.id}`, 'DELETE', null))
        ToastSuccess('Delete successfully!')
        yield put({ type: Types.FETCH_CATEGORIES });
    } catch (error) {
        ToastError(error.response.data)
    }
}

export default function* watchCategoriesSaga() {
    yield takeLatest(Types.FETCH_CATEGORIES, fetchCategoriesSaga);
    yield takeLatest(Types.ADD_CATEGORY, addCategorySaga);
    yield takeLatest(Types.UPDATE_CATEGORY, updateCategorySaga);
    yield takeLatest(Types.DELETE_CATEGORY, deleteCategorySaga);
}