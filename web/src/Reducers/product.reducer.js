import * as Type from './../Constants/actionType';

var initialState = {
    products: [],
    loading: false,
    success: false,
    error: false
};

const products = (state = initialState, action) => {
    switch (action.type) {
        case Type.PRODUCT:
            return Object.assign({}, state, initialState);
        case Type.FETCH_PRODUCT_SUCCEEDED:
            return Object.assign({}, state, {
                products: action.products.sources,
                loading: true,
                success: true,
                error: action.success
            });
        case Type.FETCH_PRODUCT_FAILED:
            return Object.assign({}, state, {
                products: [],
                loading: false,
                success: false,
                error: action.error
            });
        default: return state;
    }
};
export default products;