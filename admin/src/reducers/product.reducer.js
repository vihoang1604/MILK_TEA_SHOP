import * as Types from '../constants/product.actiontypes';

const initialState = {
    fetching: false,
    fetched: false,
    products: [],
    error: false,
    message: ''
};

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_PRODUCTS:
            return Object.assign({}, state, {
                fetching: true,
                fetched: false,
                error: false
            });
        case Types.FETCH_PRODUCTS_SUCCESSED:
            return Object.assign({}, state, {
                fetching: false,
                fetched: true,
                error: false,
                products: action.products
            });
        case Types.FETCH_PRODUCTS_FAILED:
            return Object.assign({}, state, {
                fetching: false,
                fetched: true,
                error: true,
                message: action.message
            });
        default:
            return state
    }
}
