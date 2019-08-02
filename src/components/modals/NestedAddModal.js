import React, {Component} from 'react';
import {Button, Icon, Modal} from 'semantic-ui-react';
import NewOrganiserModal from 'components/modals/NewOrganiserModal';
import AddToChallengeModal from 'components/modals/AddToChallengeModal';

class NestedAddModal extends Component {
  constructor({
    openChoice = false,
    openInput = false,
  }) {
    super();
    this.state = {openChoice, openInput};
  };

  openChoiceModal = () => this.setState({
    openChoice: true,
  });

  closeChoiceModal = () => this.setState({
    openChoice: false,
  });

  openInputModal = () => this.setState({
    openInput: true,
  });

  closeInputModal = () => this.setState({
    openInput: false,
  });

  closeAll = () => this.setState({
    openInput: false,
    openChoice: false,
  });

  render() {
    return (
      <React.Fragment>
        <NewOrganiserModal />
        <AddToChallengeModal />
      </React.Fragment>
    );
  }
}

const AddModalMultiple = () => (
  <Modal
    trigger={
      <Button className='button-style' color='green' size='large' animated='vertical'>
        <Button.Content visible><Icon name='add' />Add</Button.Content>
        <Button.Content hidden>Open Add Page</Button.Content>
      </Button>
    }
    closeIcon
    closeOnEscape = {true}
    closeOnDimmerClick = {true}
    className='modal-style'
    basic
    size = 'large'
  >
    <Modal.Header>Addition Page</Modal.Header>
    <Modal.Content>
      <p>This page allows you to add a New Organiser or add a existing Organiser to an assigned challenge. </p>
      <p>Please select one of the options below:</p>
    </Modal.Content>
    <Modal.Actions>
      <NestedAddModal />
    </Modal.Actions>
  </Modal>
);

export default AddModalMultiple;
