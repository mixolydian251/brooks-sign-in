import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import customersReducer from '../reducers/customers';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/authentication';
import loadingReducer from '../reducers/loading';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  return createStore(
    combineReducers({
      customers: customersReducer,
      filters: filtersReducer,
      auth: authReducer,
      loading: loadingReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
};
