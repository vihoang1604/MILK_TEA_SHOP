import { put, call, takeLatest } from 'redux-saga/effects';
import * as Types from '../constants/order.actiontypes';
import callApi from '../utils/apiCaller';
import { ToastSuccess } from '../utils/toaster';

function* fetchOrderSaga() {
    try {
        const orders = yield call(() => callApi('orders?sortName=Status&isDesc=false', 'GET', null).then(res => res.sources));
        yield put({ type: Types.FETCH_ORDERS_SUCCESSED, orders });
    } catch (error) {
        yield put({ type: Types.FETCH_ORDERS_FAILED, message: error.response.data })
    }
}
function* UpdateStatusOrderConfirm(action) {
    try {
        const confirm = yield call(() => callApi(`orders/${action.order.id}`, 'PUT', action.order)
            .then(res => res.sources));
        ToastSuccess('Confirm successfully!')
        yield put({ type: Types.FETCH_ORDERS, confirm });
    } catch (error) {
        yield put({ type: Types.FETCH_ORDERS_FAILED, message: error.response.data })
    }
}
function* UpdateStatusOrderCancel(action) {
    try {
        const cancel = yield call(() => callApi(`orders/${action.order.id}`, 'PUT', action.order)
            .then(res => res.sources));
        ToastSuccess('Cancel successfully!')
        yield put({ type: Types.FETCH_ORDERS, cancel });
    } catch (error) {
        yield put({ type: Types.FETCH_ORDERS_FAILED, message: error.response.data })
    }
}
export default function* watchOrderSaga() {
    yield takeLatest(Types.FETCH_ORDERS, fetchOrderSaga);
    yield takeLatest(Types.UPDATE_STATUS_ORDER_CONFIRM, UpdateStatusOrderConfirm);
    yield takeLatest(Types.UPDATE_STATUS_ORDER_CANCEL,UpdateStatusOrderCancel );
}
