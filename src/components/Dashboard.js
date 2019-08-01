import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getParticipantSnapshot, getOrganiserSnapshot, getChallengesSnapshot} from 'actions';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getParticipantSnapshot();
    this.props.getOrganiserSnapshot();
    this.props.getChallengesSnapshot();
  }
  render() {
    return (
      <div>
        <p>Dashboard</p>
      </div>
    );
  }
}
const mapDispatchToProps = {
  getParticipantSnapshot,
  getOrganiserSnapshot,
  getChallengesSnapshot,
};

const mapStateToProps = (state) => {
  return {
    organisers: state.snapshot.organisers,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
