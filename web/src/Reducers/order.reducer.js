import * as Type from './../Constants/actionType';

var initialState = {
    orders: [],
    loading: false,
    success: false,
    error: false
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case Type.ORDER:
            return Object.assign({}, state, initialState);
        case Type.FETCH_SUCCEEDED_ORDER:
          //  console.log("reduce",action.orders.sources[1].orderDetails)
            return Object.assign({}, state, {
                orders: action.orders.sources,
                loading: true,
                success: true,
                error: action.success
            });
        case Type.FETCH_FAILED_ORDER:
            return Object.assign({}, state, {
                orders: [],
                loading: false,
                success: false,
                error: action.error
            });
        default: return state;
    }
};
export default orderReducer;