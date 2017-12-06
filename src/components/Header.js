import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { firebase } from '../firebase/firebase';
import { startLogout } from "../actions/authentication";


export const Header = ({ startLogout }) => (
    <header className="header">
        <div className="navigation__links">
            <NavLink to="/dashboard" activeClassName="is-active">Search</NavLink>
            <NavLink to="/create" activeClassName="is-active">Create</NavLink>
            <NavLink to="/help" activeClassName="is-active">Help</NavLink>
            {window.innerWidth > 700 ?
                <button className="logout_button" onClick={startLogout}>
                <div className="user_profile">
                    <div className="user_name">
                        <p>{ firebase.auth().currentUser.displayName }</p>
                    </div>
                    <div className="user_picture">
                        <img src={ firebase.auth().currentUser.photoURL }/>
                    </div>
                </div>
            </button> : <button className="logout_button" onClick={startLogout}>Logout</button>}
        </div>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});


export default connect(undefined, mapDispatchToProps)(Header)
