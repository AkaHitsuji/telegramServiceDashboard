import React, {Component} from 'react';
import {Button, Icon, Modal} from 'semantic-ui-react';
import NestedAddModal from 'components/modals/NestedAddModal';

class AddModal extends Component {
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
      <Modal
        trigger={
          <Button className='button-style' color='olive' size='large' animated='vertical' onClick={this.show}>
            <Button.Content visible><Icon name='add' />Add</Button.Content>
            <Button.Content hidden>Open Add Page</Button.Content>
          </Button>
        }
        open = {this.state.open}
        onClose = {this.close}
        closeIcon
        closeOnEscape = {true}
        closeOnDimmerClick = {true}
        className='modal-style'
        basic
        size = 'large'
      >
        <Modal.Header>Addition Page</Modal.Header>
        <Modal.Content>
          <p>This page allows you to add a New Participant/Organiser or add a existing Organiser to an assigned challenge. </p>
          <p>Please select one of the options below:</p>
        </Modal.Content>
        <Modal.Actions>
          <NestedAddModal closeAddModal={this.close}/>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default AddModal;
