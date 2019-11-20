import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from "./../Reducers";
import Saga from "../Sagas/saga";

const initialState = {};

const sagaMiddleware = createSagaMiddleware();

const createStoreWithMiddleware = compose(applyMiddleware(sagaMiddleware))(createStore);

export const store = createStoreWithMiddleware(reducers, initialState);

sagaMiddleware.run(Saga);