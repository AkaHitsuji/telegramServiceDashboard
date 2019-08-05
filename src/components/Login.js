import React, {Component} from 'react';
import {connect} from 'react-redux';
// import css
import 'bootstrap/dist/css/bootstrap.css';
import 'css/loginstyle.css';
import 'App.css';
// import images
import logo from 'img/adminDashboardLogo.png';
import {performAuthentication} from 'actions';

class Login extends Component {
  handleSubmit = (event) => {
    console.log(this.username.value);
    event.preventDefault();
    this.props.performAuthentication(this.username.value, this.password.value);
  }

  render() {
    return (
      <div>
        <div className="main-container">
          {/* logo container */}
          <div className="col-md-12">
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>
          </div>
          {/* username and password input */}
          <form className="form" onSubmit={this.handleSubmit}>
            <input type="text" ref={(ref) => this.username = ref} placeholder="Username"/>
            <input type="password" ref={(ref) => this.password = ref} placeholder="Password"/>
            <button type="submit" id="login-button">LOGIN</button>
          </form>
          {this.props.error}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    error: state.metadata.error,
  };
};

const mapDispatchToProps = {
  performAuthentication,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
