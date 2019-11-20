import * as Types from '../constants/category.actiontypes';

const initialState = {
    fetching: false,
    fetched: false,
    categories: [],
    error: false,
    message: ''
};

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_CATEGORIES:
            return Object.assign({}, state, {
                fetching: true,
                fetched: false,
                error: false
            });
        case Types.FETCH_CATEGORIES_SUCCESSED:
            return Object.assign({}, state, {
                fetching: false,
                fetched: true,
                error: false,
                categories: action.categories
            });
        case Types.FETCH_CATEGORIES_FAILED:
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
