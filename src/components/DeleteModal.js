import React, {Component} from 'react';
import {Button, Header, Icon, Modal} from 'semantic-ui-react';

class DeleteModal extends Component {
  state = {
    open: false,
  }

  show = () => {
    this.setState({
      open: true,
    }, function() {
      console.log('show is called');
      console.log(this.state);
    });
  }

  close = () => {
    this.setState({
      open: false,
    });
    console.log('close is called');
    console.log(this.state);
  }
  render() {
    const {
      open,
    } = this.state;

    return (
      <div>
        <Button onClick={this.show}>Delete</Button>

        <Modal
          open={this.state.open}
          onClose={this.close}
          basic
          size='small'
        >
          <Header icon='trash alternate' content='Remove Organiser' />
          <Modal.Content>
            <p>
              Are you sure you want to remove (this organiser) from (this challenge)?
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button color='red' inverted onClick={this.close}>
              <Icon name='remove' /> No
            </Button>
            <Button color='green' inverted onClick={this.close}>
              <Icon name='checkmark' /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default DeleteModal;
