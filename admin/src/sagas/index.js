import { all, fork } from 'redux-saga/effects';
import watchCategoriesSaga from './category.saga';
import watchProductsSaga from './product.saga';
import watchOrderSaga from './order.saga';
import watchUsersSaga from './user.saga';
import watchRolesSaga from './role.saga';

export default function* rootSaga() {
    yield all([
        fork(watchCategoriesSaga),
        fork(watchProductsSaga),
        fork(watchOrderSaga),
        fork(watchUsersSaga),
        fork(watchRolesSaga)
    ]);
}
