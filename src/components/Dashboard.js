import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {getParticipantSnapshot, signOut, getOrganiserSnapshot, updateChallenges, getChallengesSnapshot} from 'actions';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import matchSorter from 'match-sorter';
import {css} from '@emotion/core';
import {Button, Icon} from 'semantic-ui-react';
import {RiseLoader} from 'react-spinners';
import OrgChallengeArray from 'components/OrgChallengeArray';
import AddModal from 'components/modals/AddModal';
import DeleteModal from 'components/modals/DeleteModal';
import UpdateModal from 'components/modals/UpdateModal';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getParticipantSnapshot();
    this.props.getOrganiserSnapshot();
    this.props.getChallengesSnapshot();
  }

  signOut = () => {
    this.props.signOut();
  }

  clickHandler = () => {
    axios.get('https://codeit-suisse-coordinator2019.herokuapp.com/api/challenges')
        .then((res) => {
          const data = res.data;
          this.props.updateChallenges(data);
          // populate database
        }).catch((err) => {
          console.log('Error in connection.');
        });
  }

  dataTabs = () => {
    const participantColumns = [{
      Header: 'NAME',
      accessor: 'name',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, {keys: ['name']}),
      filterAll: true,
    }, {
      Header: 'TELEGRAM NAME',
      accessor: 'id',
      filterMethod: (filter, rows) => matchSorter(rows, filter.value, {keys: ['id']}),
      filterAll: true,
    }, {
      Header: 'TEAM NAME',
      accessor: 'team',
      filterMethod: (filter, rows) => matchSorter(rows, filter.value, {keys: ['team']}),
      filterAll: true,
    }, {
      Header: 'DELETE',
      filterable: false,
      Cell: (props) => {
        return (
          <DeleteModal type='participant' participant={props.original.id}/>
        );
      },
    }];

    const organiserColumns = [{
      Header: 'NAME',
      accessor: 'name',
      filterMethod: (filter, rows) => matchSorter(rows, filter.value, {keys: ['name']}),
      filterAll: true,
    }, {
      Header: 'TELEGRAM NAME',
      accessor: 'id',
      filterMethod: (filter, rows) => matchSorter(rows, filter.value, {keys: ['id']}),
      filterAll: true,
    },
    {
      Header: 'Challenges',
      filterable: false,
      Cell: (props) => {
        return (
          <OrgChallengeArray organiserID={props.original.id} />
        );
      },
    }, {
      Header: 'DELETE',
      filterable: false,
      Cell: (props) => {
        console.log(props.original);
        return (
          <DeleteModal type='organiser' organiser={props.original.id}/>
        );
      },
    }];

    const challengeColumns = [{
      Header: 'NAME',
      accessor: 'name',
      filterMethod: (filter, rows) => matchSorter(rows, filter.value, {keys: ['name']}),
      filterAll: true,
    }, {
      Header: 'TELEGRAM NAME',
      accessor: 'id',
      filterMethod: (filter, rows) => matchSorter(rows, filter.value, {keys: ['id']}),
      filterAll: true,
    }, {
      Header: 'LOCATION',
      accessor: 'location',
      filterMethod: (filter, rows) => matchSorter(rows, filter.value, {keys: ['name']}),
      filterAll: true,
    }, {
      Header: 'DELETE',
      filterable: false,
      Cell: (props) => {
        console.log('props', props);
        return (
          <DeleteModal type='challenge' challenge={props.original.challenge} organiser={props.original.orgIndex}/>
        );
      },
    }];

    const override = css`
      display: block;
      margin: 0 auto;
      border-color: #FFC900;`;

    const challengeTabList = this.props.challenges.map((challenge, index) => {
      return <Tab> Challenge {index+1}</Tab>;
    });

    const tabPanelList = this.props.challenges.map((challenge, index) => {
      if (challenge.organisers.length > 0) {
        const orgData = challenge.organisers.map((name, orgIndex) => {
          name['challenge'] = index;
          name['orgIndex'] = orgIndex;
          return name;
        });

        return (
          <TabPanel>
            <ReactTable className="-striped -highlight" columns={challengeColumns} data={orgData} filterable/>
          </TabPanel>
        );
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
            <Tab>Participants</Tab>
            <Tab>Organisers</Tab>
            <Tab>Challenges</Tab>
          </TabList>
          <TabPanel><ReactTable className="-striped -highlight" columns={participantColumns} data={this.props.participants} filterable/></TabPanel>
          <TabPanel><ReactTable className="-striped -highlight" columns={organiserColumns} data={this.props.organisers} filterable/></TabPanel>
          <TabPanel>
            <Tabs forceRenderTabPanel defaultIndex={0}>
              <TabList>
                {challengeTabList}
              </TabList>
              {tabPanelList}
            </Tabs>
          </TabPanel>
        </Tabs>
      );
    } else {
      return (
        <div className='sweet-loading App-center'>
          <RiseLoader
            css={override}
            sizeUnit={'px'}
            size={15}
            color={'#FFC900'}
          />
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <header className="App-header">
          <div className="button-container">
            <div className="left-button"><AddModal/></div>
            <div className="right-button"><UpdateModal/></div>
          </div>
          <div className='title-container'>
            <p className='dashboard-title'>ORGANISER DASHBOARD</p>
          </div>
          <div className="button-container">
            <div className="right-button">
              <Button animated className='button-style' color='blue' onClick={this.signOut} size='large'>
                <Button.Content visible>Sign Out</Button.Content>
                <Button.Content hidden>
                  <Icon name='times' />
                </Button.Content>
              </Button>
            </div>
          </div>
        </header>
        <div className="col-md-12">
          {this.dataTabs()}
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = {
  signOut,
  getParticipantSnapshot,
  getOrganiserSnapshot,
  getChallengesSnapshot,
  updateChallenges,
};

const mapStateToProps = (state) => {
  return {
    participants: state.snapshot.participants,
    organisers: state.snapshot.organisers,
    challenges: state.snapshot.challenges,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
