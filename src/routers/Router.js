import React from 'react';
import { Router, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import LoginPage from '../components/LoginPage';
import DashboardPage from '../components/DashboardPage';
import CreateCustomerPage from '../components/CreateCustomerPage';
import EditCustomerPage from '../components/EditCustomerPage';
import ViewCustomerPage from '../components/ViewCustomerPage';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Loading from '../components/Loading';

const history = createHistory();

const AppRouter = ({ isLoading }) => (
  <Router history={history}>
    <div>
      {isLoading && <Loading />}
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/dashboard" component={DashboardPage} />
        <PrivateRoute path="/create" component={CreateCustomerPage} />
        <PrivateRoute path="/edit/:id" component={EditCustomerPage} />
        <PrivateRoute path="/view/:id" component={ViewCustomerPage} />
        <PrivateRoute path="/help" component={HelpPage} />
        <PublicRoute component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

const mapStateToProps = state => ({
  isLoading: state.loading.loading
});

export default connect(mapStateToProps)(AppRouter);

export { history };
