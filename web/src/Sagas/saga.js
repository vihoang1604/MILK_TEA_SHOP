import { all } from 'redux-saga/effects';
import { watchUserSaga } from './auth.saga';
import { watchProductExpenses } from './productSaga';
import { watchOrderExpenses } from './orderSaga'

export default function* rootSaga() {
    yield all([
        watchUserSaga(),
        watchProductExpenses(),
        watchOrderExpenses()
    ])
}