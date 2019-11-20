import * as Types from '../constants/order.actiontypes';

const initialState = {
    fetching: false,
    fetched: false,
    orders: [],
    status: {},
    error: false,
    message: ''
};
export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_ORDERS:
            return Object.assign({}, state, {
                fetching: true,
                fetched: false,
                error: false
            });
        case Types.FETCH_ORDERS_SUCCESSED:
            return Object.assign({}, state, {
                fetching: false,
                fetched: true,
                error: false,
                orders: action.orders
            });
        case Types.FETCH_ORDERS_FAILED:
            return Object.assign({}, state, {
                fetching: false,
                fetched: true,
                error: true,
                message: action.message
            });
        case Types.UPDATE_STATUS_ORDER_CONFIRM:
            return Object.assign({}, state, {
                fetching: true,
                fetched: false,
                error: false
            });
        case Types.UPDATE_STATUS_ORDER_CANCEL:
            return Object.assign({}, state, {
                fetching: true,
                fetched: false,
                error: false
            });
        default:
            return state
    }
}