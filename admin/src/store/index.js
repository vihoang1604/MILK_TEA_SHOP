import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const storeEnhancers = compose(
    applyMiddleware(sagaMiddleware),
);

export const store = createStore(
    reducers,
    storeEnhancers
);

sagaMiddleware.run(rootSaga);
