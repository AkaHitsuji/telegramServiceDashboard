import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Header, Icon, Modal, Form} from 'semantic-ui-react';

import {addOrganiser} from 'actions';

class NewParticipantModal extends Component {
  state = {
    open: false,
    name: '',
    tgName: '',
    location: '',
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
    this.props.closeAddModal();
  }

  setName = (e) => {
    this.setState({name: e.target.value});
  }

  setTgName = (e) => {
    this.setState({tgName: e.target.value});
  }

  addOrg = () => {
    this.close();
    const {name, tgName} = this.state;
    this.props.addOrganiser(name, tgName);
  }

  render() {
    return (
      <React.Fragment>
        <Button onClick={this.show} color="pink" inverted>Add New Participant</Button>
        <Modal
          open={this.state.open}
          onClose={this.close}
          basic
          size='large'
        >
          <Header icon='chess pawn' content='Add New Participant' />
          <Modal.Content>
            <Form size='large' key='large' inverted>
              <Form.Input required fluid label='Name' onChange={this.setName} placeholder='Type your name here..' />
              <Form.Input required fluid label='Telegram Name' onChange={this.setTgName} placeholder='Type your Telegram username here..' />
              {/* TODO: setTgName change to set participant team name */}
              <Form.Input required fluid label='Team Name' onChange={this.setTgName} placeholder='Type your Team Name here..' />
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color='red' inverted onClick={this.close}>
              <Icon name='remove' /> Cancel
            </Button>
            <Button color='green' inverted onClick={this.addOrg}>
              <Icon name='checkmark' /> Add
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = {
  addOrganiser,
};

export default connect(null, mapDispatchToProps)(NewParticipantModal);
