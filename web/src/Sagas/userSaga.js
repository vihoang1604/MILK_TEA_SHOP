// import { callApi } from './../Utils/CallAPI';
// import {
//     REGISTER,
//     LOGIN,
//     FETCH_SUCCEEDED,
//     FETCH_FAILED
// } from '../Constants/actionType';
// import { put, takeEvery, call } from 'redux-saga/effects';

// export function* register(action) {
//     try {
//         const user = yield call(() => callApi(`/User`, 'POST', action.user).then(res => {
//             return res.data;
//         }));
//         yield put({ type: FETCH_SUCCEEDED, user });
//     } catch (error) {
//         yield put({ type: FETCH_FAILED, error });
//     }
// }
// export function* Login(action) {
//     const { email, password } = action
//     try {
//         const user = yield call(() => CallApi(`/User`, 'POST', (JSON.stringify({ email, password }))).then(res => {
//             console.log(res.data);   
//             return res.data;
//         }));
//         yield put({ type: FETCH_SUCCEEDED, user });
//     } catch (error) {
//         yield put({ type: FETCH_FAILED, error });
//     }
// }

// export function* watchUserExpenses() {
//     yield takeEvery(REGISTER, register);
//     yield takeEvery(LOGIN, Login);
// }