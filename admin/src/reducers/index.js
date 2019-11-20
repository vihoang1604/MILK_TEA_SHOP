import { combineReducers } from 'redux';
import { categoryReducer } from './category.reducer';
import { productReducer } from './product.reducer';
import { orderReducer } from './order.reducer';
import { userReducer } from './user.reducer';
import { roleReducer } from './role.reducer';

export default combineReducers({
    categories: categoryReducer,
    products: productReducer,
    orders :orderReducer,
    users: userReducer,
    roles: roleReducer
});
