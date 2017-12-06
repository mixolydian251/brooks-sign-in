import React from 'react';
import { Router, Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import LoginPage from '../components/LoginPage';
import DashboardPage from '../components/DashboardPage'
import CreateCustomerPage from '../components/CreateCustomerPage';
import EditCustomerPage from '../components/EditCustomerPage';
import ViewCustomerPage from '../components/ViewCustomerPage';
import HelpPage from '../components/HelpPage'
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true}/>
                <PrivateRoute path="/dashboard" component={DashboardPage}/>
                <PrivateRoute path="/create" component={CreateCustomerPage}/>
                <PrivateRoute path="/edit/:id" component={EditCustomerPage}/>
                <PrivateRoute path="/view/:id" component={ViewCustomerPage}/>
                <PrivateRoute path="/help" component={HelpPage}/>
                <PublicRoute component={NotFoundPage}/>
            </Switch>
        </div>
    </Router>
);

export { history, AppRouter as default };

