import { callApiDotNet } from './../Utils/CallAPI';
import {
    FETCH_PRODUCT_SUCCEEDED, FETCH_PRODUCT_FAILED, PRODUCT, SEARCH
} from './../Constants/actionType';
import { put, takeEvery, call } from 'redux-saga/effects';

export function* products(action) {
    try {
        const products = yield call(() => callApiDotNet(`products`, 'GET', action.products).then(res => {
            return res.data;
        }));
        yield put({ type: FETCH_PRODUCT_SUCCEEDED, products });
    } catch (error) {
        yield put({ type: FETCH_PRODUCT_FAILED, error });
    }
}

export function* searchProduct(action) {
    try {
        const products = yield call(() => callApiDotNet(`products?query=${action.product}`, 'GET', null).then(res => {
            return res.data;
        }));
        yield put({ type: FETCH_PRODUCT_SUCCEEDED, products });
    } catch (error) {
        yield put({ type: FETCH_PRODUCT_FAILED, error });
    }
}

export function* watchProductExpenses() {
    yield takeEvery(PRODUCT, products);
    yield takeEvery(SEARCH, searchProduct);

}