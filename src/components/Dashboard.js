import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getParticipantSnapshot, getOrganiserSnapshot, getChallengesSnapshot} from 'actions';
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

  render() {
    const participantColumns = [{
      Header: 'Name',
      accessor: 'name',
      filterMethod: (filter, rows) => matchSorter(rows, filter.value, {keys: ['name']}),
      filterAll: true,
      id: 'partiCol1',
    }, {
      Header: 'Telegram Name',
      accessor: 'id',
      filterMethod: (filter, rows) => matchSorter(rows, filter.value, {keys: ['id']}),
      filterAll: true,
      id: 'partiCol2',
    }];

    const organiserColumns = [{
      Header: 'Name',
      accessor: 'name',
      filterMethod: (filter, rows) => matchSorter(rows, filter.value, {keys: ['name']}),
      filterAll: true,
      id: 'orgCol1',
    }, {
      Header: 'Telegram Name',
      accessor: 'id',
      filterMethod: (filter, rows) => matchSorter(rows, filter.value, {keys: ['id']}),
      filterAll: true,
      id: 'orgCol2',
    }];

    const challengeColumns = [{
      Header: 'Name',
      accessor: 'name',
      filterMethod: (filter, rows) => matchSorter(rows, filter.value, {keys: ['name']}),
      filterAll: true,
      id: 'chaCol1',
    }, {
      Header: 'Telegram Name',
      accessor: 'id',
      filterMethod: (filter, rows) => matchSorter(rows, filter.value, {keys: ['id']}),
      filterAll: true,
      id: 'chaCol2',
    }];

    const dataTabs = (
      <Tabs defaultIndex={0} onSelect={(tabIndex) => this.setState({tabIndex})}>
        <TabList>
          <Tab>Particpants</Tab>
          <Tab>Organisers</Tab>
          <Tab>Challenges></Tab>
        </TabList>
        <TabPanel><ReactTable className="-striped -highlight" columns={participantColumns} data={this.props.participants} filterable/></TabPanel>
        <TabPanel><ReactTable className="-striped -highlight" columns={organiserColumns} data={this.props.organisers} filterable/></TabPanel>
        <TabPanel>
          <Tabs forceRenderTabPanel defaultIndex={0}>
            <TabList>
              <Tab>Challenge 1</Tab>
              <Tab>Challenge 2</Tab>
              <Tab>Challenge 3</Tab>
              <Tab>Challenge 4</Tab>
              <Tab>Challenge 5</Tab>
              <Tab>Challenge 6</Tab>
              <Tab>Challenge 7</Tab>
              <Tab>Challenge 8</Tab>
              <Tab>Challenge 9</Tab>
              <Tab>Challenge 10</Tab>
            </TabList>
            <TabPanel><ReactTable className="-striped -highlight" columns={challengeColumns} data={this.props.challenge1} filterable/></TabPanel>
            <TabPanel><ReactTable className="-striped -highlight" columns={challengeColumns} data={this.props.challenge2} filterable/></TabPanel>
            <TabPanel><ReactTable className="-striped -highlight" columns={challengeColumns} data={this.props.challenge3} filterable/></TabPanel>
            <TabPanel><ReactTable className="-striped -highlight" columns={challengeColumns} data={this.props.challenge4} filterable/></TabPanel>
            <TabPanel><ReactTable className="-striped -highlight" columns={challengeColumns} data={this.props.challenge5} filterable/></TabPanel>
            <TabPanel><ReactTable className="-striped -highlight" columns={challengeColumns} data={this.props.challenge6} filterable/></TabPanel>
            <TabPanel><ReactTable className="-striped -highlight" columns={challengeColumns} data={this.props.challenge7} filterable/></TabPanel>
            <TabPanel><ReactTable className="-striped -highlight" columns={challengeColumns} data={this.props.challenge8} filterable/></TabPanel>
            <TabPanel><ReactTable className="-striped -highlight" columns={challengeColumns} data={this.props.challenge9} filterable/></TabPanel>
            <TabPanel><ReactTable className="-striped -highlight" columns={challengeColumns} data={this.props.challenge10} filterable/></TabPanel>
          </Tabs>
        </TabPanel>
      </Tabs>
    );

    return (
      <div>
        <header className="App-header">
          <p>Organiser Dashboard</p>
        </header>
        {dataTabs}
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
    participants: state.snapshot.participants,
    organisers: state.snapshot.organisers,
    challenges: state.snapshot.challenges,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
