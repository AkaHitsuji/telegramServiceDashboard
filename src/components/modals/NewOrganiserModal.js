import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Header, Icon, Modal, Form} from 'semantic-ui-react';

import {addOrganiser} from 'actions';

class NewOrganiserModal extends Component {
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
  }

  countryOptions = [
    {key: 's', text: 'Singapore', value: 'singapore'},
    {key: 'h', text: 'Hong Kong', value: 'hongkong'},
  ];

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
        <Button onClick={this.show} color="pink" inverted>Add New Organiser</Button>
        <Modal
          open={this.state.open}
          onClose={this.close}
          basic
          size='large'
        >
          <Header icon='group' content='Add New Organiser' />
          <Modal.Content>
            <Form size='large' key='large' inverted>
              <Form.Input required fluid label='Name' onChange={this.setName} placeholder='Type your name here..' />
              <Form.Input required fluid label='Telegram Name' onChange={this.setTgName} placeholder='Type your Telegram username here..' />
              <Form.Select required label='Select Location' options={this.countryOptions} placeholder='Singapore' />
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

export default connect(null, mapDispatchToProps)(NewOrganiserModal);
