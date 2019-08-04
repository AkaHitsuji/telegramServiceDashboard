import React, {Component} from 'react';
import {Button, Header, Icon, Modal, Form} from 'semantic-ui-react';

class AddToChallengeModal extends Component {
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

  challengeOptions = [
    {key: 1, text: 'Challenge 1', value: 'challenge1'},
    {key: 2, text: 'Challenge 2', value: 'challenge2'},
    {key: 3, text: 'Challenge 3', value: 'challenge3'},
    {key: 4, text: 'Challenge 4', value: 'challenge4'},
    {key: 5, text: 'Challenge 5', value: 'challenge5'},
    {key: 6, text: 'Challenge 6', value: 'challenge6'},
    {key: 7, text: 'Challenge 7', value: 'challenge7'},
    {key: 8, text: 'Challenge 8', value: 'challenge8'},
    {key: 9, text: 'Challenge 9', value: 'challenge9'},
    {key: 10, text: 'Challenge 10', value: 'challenge10'},
  ];

  organiserOptions = [
    {key: 0, text: 'Ang Yang', value: 'angyang'},
    {key: 1, text: 'De Sheng', value: 'desheng'},
    {key: 2, text: 'Jie Xun', value: 'jiexun'},
    {key: 3, text: 'Dao Han', value: 'daohan'},
  ];

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
              <Form.Select required label='Select Organiser' options={this.organiserOptions} placeholder='Organiser Name' />
              <Form.Select required label='Select Challenge' options={this.challengeOptions} placeholder='Challenges' />
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

export default AddToChallengeModal;
