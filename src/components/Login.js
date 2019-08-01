import React, {Component} from 'react';
// import css
import 'bootstrap/dist/css/bootstrap.css';
import 'css/loginstyle.css';
import 'App.css';
// import images
import logo from 'img/adminDashboardLogo.png';

class Login extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onToggle();
  }

  render() {
    return (
      <div>
        <div class="main-container">
          {/* logo container */}
          <div class="col-md-12">
            <div class="logo">
              <img src={logo} alt="Logo" />
            </div>
          </div>
          {/* username and password input */}
          <form class="form">
            <input type="text" placeholder="Username"/>
            <input type="password" placeholder="Password"/>
          </form>
          <form method="get" action="home.html" onSubmit={this.handleSubmit}>
            <button type="submit" id="login-button">LOGIN</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
