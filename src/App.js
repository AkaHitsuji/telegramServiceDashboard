import React, {Component} from 'react';
import {connect} from 'react-redux';
import Dashboard from 'components/Dashboard';
import Login from 'components/Login';
import LoadingMessage from 'components/LoadingMessage';

import 'App.css';

class App extends Component {
  render() {
    return (
      <div>
        {!!this.props.loading ? <LoadingMessage message={this.props.loading}/> : ''}
        {this.props.authenticated ? <Dashboard /> : <Login />}
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
