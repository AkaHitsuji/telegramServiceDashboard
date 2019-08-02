import React, {Component} from 'react';
import {Button, Header, Icon, Modal} from 'semantic-ui-react';

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

  render() {
    return (
      <React.Fragment>
        <Button onClick={this.show} color="pink" inverted>Add New Organiser</Button>
        <Modal
          open={this.state.open}
          onClose={this.close}
          basic
          size='small'
        >
          <Header icon='add' content='Add New Organiser' />
          <Modal.Content>
            <p>
              Put add functions here.
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
      </React.Fragment>
    );
  }
}

export default NewOrganiserModal;
