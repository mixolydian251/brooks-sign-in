import 'normalize.css/normalize.css';
import './styles/style.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import AppRouter, { history } from './routers/Router';
import Loading from './components/Loading';
import { firebase } from './firebase/firebase';
import { startSetCustomers } from './actions/customers';
import { login, logout } from './actions/authentication';
import { toggleLoading } from './actions/loading';

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;

const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;

    const load = document.getElementById('loading');
    load.style.opacity = '0';
    setTimeout(() => {
      store.dispatch(toggleLoading());
    }, 1000);
  }
};

ReactDOM.render(<Loading />, document.getElementById('app'));

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetCustomers()).then(() => {
      renderApp();
      if (history.location.pathname === '/') {
        history.push('/dashboard');
      }
    });
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});
