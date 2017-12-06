import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header'
import Loading from '../components/Loading';

export const PrivateRoute = ({
    isLoading,
    isAuthenticated,
    component: Component,
    ...rest
    }) => (
    <Route {...rest} component={(props) => (
        isAuthenticated ? (
            <div>
                {isLoading && <Loading/>}
                <Header/>
                <Component {...props}/>
            </div>

        ) : (
            <Redirect to="/" />
        )
    )}/>
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid,
    isLoading: state.loading.loading
});

export default connect(mapStateToProps)(PrivateRoute)