import React, {Component} from 'react';
import {Button, Header, Icon, Modal, Form} from 'semantic-ui-react';

class NewOrganiserModal extends Component {
  state = {
    open: false,
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
              <Form.Input required fluid label='Name' placeholder='Type your name here..' />
              <Form.Input required fluid label='Telegram Name' placeholder='Type your Telegram username here..' />
              <Form.Select required label='Select Location' options={this.countryOptions} placeholder='Singapore' />
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color='red' inverted onClick={this.close}>
              <Icon name='remove' /> Cancel
            </Button>
            <Button color='green' inverted onClick={this.close}>
              <Icon name='checkmark' /> Add
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
}

export default NewOrganiserModal;
