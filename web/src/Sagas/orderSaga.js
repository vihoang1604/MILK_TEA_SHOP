import { callApiDotNet } from "../Utils/CallAPI";
import {
    ORDER,
    FETCH_SUCCEEDED_ORDER,
    FETCH_FAILED_ORDER
}
    from "../Constants/actionType";
import { put, takeEvery, call } from 'redux-saga/effects';

export function* orders(action) {
    try {
        const orders = yield call(() => callApiDotNet(`/orders`, 'GET', action.orders).then(res => {
            return res.data;
        }));
        yield put({ type: FETCH_SUCCEEDED_ORDER, orders });
    } catch (error) {
        yield put({ type: FETCH_FAILED_ORDER, error });
    }
}
export function* watchOrderExpenses() {
    yield takeEvery(ORDER, orders);
}