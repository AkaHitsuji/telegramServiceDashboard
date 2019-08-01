import React, {Component} from 'react';
import Dashboard from 'components/Dashboard';
import Login from 'components/Login';

import 'App.css';

class App extends Component {
  state = {authenticated: true}
  onToggle = () => {
    this.state.authenticated ? this.setState({authenticated: false}) : this.setState({authenticated: true});
    // this.setState({authenticated: true});
  }
  render() {
    return (
      <div>
        {this.state.authenticated ? <Dashboard /> : <Login onToggle={this.onToggle}/>}
      </div>
    );
  }
}

export default App;
