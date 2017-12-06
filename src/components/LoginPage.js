import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogin} from "../actions/authentication"

class LoginPage extends React.Component{
    render () {
        return (
            <div className="login_container">
                <h1>Login to Brooks</h1>
                <button className="login_button" onClick={this.props.startLogin}>Login</button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);