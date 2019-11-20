import authReducer from './auth.reducer';
import titleReducer from './user.reducer';
import products from './product.reducer'
import orderReducer from './order.reducer'
import { combineReducers } from 'redux';

const reducers = combineReducers({
    auth: authReducer,
    titleReducer,
    products,
    orders: orderReducer,
});
export default reducers;