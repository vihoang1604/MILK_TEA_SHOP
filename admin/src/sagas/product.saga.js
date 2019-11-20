import { put, call, takeLatest } from 'redux-saga/effects';
import * as Types from '../constants/product.actiontypes';
import callApi from '../utils/apiCaller';
import { ToastSuccess, ToastError } from '../utils/toaster';

function* fetchProductsSaga() {
    try {
        const products = yield call(() => callApi('products', 'GET', null).then(res => res.sources));
        yield put({ type: Types.FETCH_PRODUCTS_SUCCESSED, products });
    } catch (error) {
        yield put({ type: Types.FETCH_PRODUCTS_FAILED, message: error.response.data })
    }
}

function* addProductSaga(action) {
    try {
        yield call(() => callApi('products', 'POST', action.product))
        ToastSuccess('Add successfully!')
        yield put({ type: Types.FETCH_PRODUCTS })
    } catch (error) {
        ToastError(error.response.data)
    }
}

function* updateProductSaga(action) {
    try {
        yield call(() => callApi(`products/${action.product.id}`, 'PUT', action.product))
        ToastSuccess('Update successfully!')
        yield put({ type: Types.FETCH_PRODUCTS });
    } catch (error) {
        ToastError(error.response.data)
    }
}

function* deleteProductSaga(action) {
    try {
        yield call(() => callApi(`products/${action.id}`, 'DELETE', null))
        ToastSuccess('Delete successfully!')
        yield put({ type: Types.FETCH_PRODUCTS });
    } catch (error) {
        ToastError(error.response.data)
    }
}

export function* searchProduct(action) {
  try {
      const products = yield call(() => callApi(`products?query=${action.product}`, 'GET', null).then(res => res.sources));
      yield put({ type: Types.FETCH_PRODUCTS_SUCCESSED, products });
  } catch (error) {
      yield put({ type: Types.FETCH_PRODUCTS_FAILED, error });
  }
}

export default function* watchProductsSaga() {
    yield takeLatest(Types.FETCH_PRODUCTS, fetchProductsSaga);
    yield takeLatest(Types.ADD_PRODUCT, addProductSaga);
    yield takeLatest(Types.UPDATE_PRODUCT, updateProductSaga);
    yield takeLatest(Types.DELETE_PRODUCT, deleteProductSaga);
    yield takeLatest(Types.SEARCH_PRODUCT, searchProduct);

}
