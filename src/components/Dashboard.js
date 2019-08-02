import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {getParticipantSnapshot, getOrganiserSnapshot, updateChallenges, getChallengesSnapshot, getOrgFromRef} from 'actions';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import matchSorter from 'match-sorter';

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

  dataTabs = () => {
    const participantColumns = [{
      Header: 'Name',
      accessor: 'name',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, {keys: ['name']}),
      filterAll: true,
    }, {
      Header: 'Telegram Name',
      accessor: 'id',
      filterMethod: (filter, rows) => matchSorter(rows, filter.value, {keys: ['id']}),
      filterAll: true,
    }];

    const organiserColumns = [{
      Header: 'Name',
      accessor: 'name',
      filterMethod: (filter, rows) => matchSorter(rows, filter.value, {keys: ['name']}),
      filterAll: true,
    }, {
      Header: 'Telegram Name',
      accessor: 'id',
      filterMethod: (filter, rows) => matchSorter(rows, filter.value, {keys: ['id']}),
      filterAll: true,
    }];

    const challengeColumns = [{
      Header: 'Name',
      accessor: 'name',
      filterMethod: (filter, rows) => matchSorter(rows, filter.value, {keys: ['name']}),
      filterAll: true,
    }];

    const tabList = this.props.challenges.map((challenge, index) => {
      return <Tab> Challenge {index+1}</Tab>;
    });

    const tabPanelList = this.props.challenges.map((challenge, index) => {
      if (challenge.organisers.length > 0) {
        this.props.getOrgFromRef(challenge.organisers, index);
        if (!!challenge.organiserName) {
          console.log(challenge.organiserName);
          return (
            <TabPanel>
              <ReactTable className="-striped -highlight" columns={challengeColumns} data={challenge.organiserName} filterable/>
            </TabPanel>
          );
        } else {
          return (
            <TabPanel>
              <ReactTable className="-striped -highlight" columns={challengeColumns} data={['loading']} filterable/>
            </TabPanel>
          );
        }
      } else {
        return (
          <TabPanel>
            <ReactTable className="-striped -highlight" columns={challengeColumns} data={['No data']} filterable/>
          </TabPanel>
        );
      }
    });

    const loaded = this.props.participants.length>0 && this.props.organisers.length>0 && this.props.challenges.length>0;
    if (loaded) {
      return (
        <Tabs defaultIndex={0} onSelect={(tabIndex) => this.setState({tabIndex})}>
          <TabList>
            <Tab>Particpants</Tab>
            <Tab>Organisers</Tab>
            <Tab>Challenges</Tab>
          </TabList>
          <TabPanel><ReactTable className="-striped -highlight" columns={participantColumns} data={this.props.participants} filterable/></TabPanel>
          <TabPanel><ReactTable className="-striped -highlight" columns={organiserColumns} data={this.props.organisers} filterable/></TabPanel>
          <TabPanel>
            <Tabs forceRenderTabPanel defaultIndex={0}>
              <TabList>
                {tabList}
              </TabList>
              {tabPanelList}
            </Tabs>
          </TabPanel>
        </Tabs>
      );
    } else {
      return 'loading';
    }
  };

  render() {
    return (
      <div>

        <header className="App-header">
          <p>Organiser Dashboard</p>
        </header>
        <button onClick={this.clickHandler}>Update</button>
        {this.dataTabs()}
      </div>
    );
  }
}
const mapDispatchToProps = {
  getParticipantSnapshot,
  getOrganiserSnapshot,
  getChallengesSnapshot,
  updateChallenges,
  getOrgFromRef,
};

const mapStateToProps = (state) => {
  return {
    participants: state.snapshot.participants,
    organisers: state.snapshot.organisers,
    challenges: state.snapshot.challenges,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);