import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Header, Icon, Modal, Form} from 'semantic-ui-react';

import {addOrgToChallenge} from 'actions';

class AddToChallengeModal extends Component {
  state = {
    open: false,
    organiserChoice: '',
    challengechoice: '',
  }

  show = () => {
    this.setState({
      open: true,
    });
  }

  close = () => {
    this.setState({
      open: false,
    });
  }

  addOrganiser = () => {
    this.close();
    // add organiser
    const {challengeChoice, organiserChoice} = this.state;
    this.props.addOrgToChallenge(challengeChoice, organiserChoice);
  }

  challengeOptions = () => {
    return this.props.challenges.map((challenge, key) => {
      return {
        key,
        text: challenge.id,
        value: challenge.id,
      };
    });
  }

  organiserOptions = () => {
    return this.props.organisers.map((organiser, key) => {
      return {
        key,
        text: organiser.name,
        value: organiser.id,
      };
    });
  }

  setOrganiserChoice = (e, {value}) => {
    this.setState({organiserChoice: value});
  }

  setChallengeChoice = (e, {value}) => {
    this.setState({challengeChoice: value});
  }

  render() {
    return (
      <React.Fragment>
        <Button onClick={this.show} color="pink" inverted>Assign Organiser to Challenge</Button>
        <Modal
          open={this.state.open}
          onClose={this.close}
          basic
          size='large'
        >
          <Header icon='wpforms' content='Assign Existing Organiser to Challenge' />
          <Modal.Content>
            <Form size='large' key='large' inverted>
              <Form.Select required label='Select Organiser' onChange={this.setOrganiserChoice} options={this.organiserOptions()} placeholder='Organiser Name' />
              <Form.Select required label='Select Challenge' onChange={this.setChallengeChoice} options={this.challengeOptions()} placeholder='Challenges' />
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color='red' inverted onClick={this.close}>
              <Icon name='remove' /> Cancel
            </Button>
            <Button color='green' inverted onClick={this.addOrganiser}>
              <Icon name='checkmark' /> Add
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const {organisers, challenges} = state.snapshot;
  return {
    organisers,
    challenges,
  };
};

const mapDispatchToProps = {
  addOrgToChallenge,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToChallengeModal);
