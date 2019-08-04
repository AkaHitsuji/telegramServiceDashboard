import React, {Component} from 'react';
import {connect} from 'react-redux';
import Dashboard from 'components/Dashboard';
import Login from 'components/Login';
import LoadingMessage from 'components/LoadingMessage';

import 'App.css';

class App extends Component {
  state = {authenticated: false}
  onToggle = () => {
    this.state.authenticated ? this.setState({authenticated: false}) : this.setState({authenticated: true});
    // this.setState({authenticated: true});
  }

  render() {
    return (
      <div>
        {!!this.props.loading ? <LoadingMessage message={this.props.loading}/> : ''}
        {this.state.authenticated ? <Dashboard onToggle={this.onToggle} /> : <Login onToggle={this.onToggle}/>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {authenticated, loading} = state.metadata;
  return {
    authenticated,
    loading,
  };
};


export default connect(mapStateToProps, null)(App);
