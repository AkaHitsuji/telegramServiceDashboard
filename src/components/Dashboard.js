import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {getParticipantSnapshot, getOrganiserSnapshot, updateChallenges, getChallengesSnapshot} from 'actions';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getParticipantSnapshot();
    this.props.getOrganiserSnapshot();
    this.props.getChallengesSnapshot();
  }

  clickHandler = () => {
    axios.get('https://codeit-suisse-coordinator2019.herokuapp.com/api/challenges')
        .then((res) => {
          const data = res.data;
          this.props.updateChallenges(data);
          // populate database
        });
  }
  render() {
    return (
      <div>
        <button onClick={this.clickHandler}>Update</button>
        <p>Dashboard</p>
      </div>
    );
  }
}
const mapDispatchToProps = {
  getParticipantSnapshot,
  getOrganiserSnapshot,
  getChallengesSnapshot,
  updateChallenges,
};

const mapStateToProps = (state) => {
  return {
    organisers: state.snapshot.organisers,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
