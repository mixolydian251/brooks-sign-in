import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/authentication';

class LoginPage extends React.Component {
  render() {
    return (
      <div className="login_container">
        <h1>Login to Brooks</h1>
        <button
          autoFocus
          className="login_button"
          onClick={this.props.startLogin}
        >
          Login
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
