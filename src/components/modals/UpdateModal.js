import React, {Component} from 'react';
import {Button, Header, Icon, Modal} from 'semantic-ui-react';
import {connect} from 'react-redux';

import {deleteOrgFromChallenge} from 'actions';

class UpdateModal extends Component {
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

  delete = () => {
    this.close();
    this.props.deleteOrgFromChallenge(this.props.challenge, this.props.organiser);
  }

  render() {
    return (
      <React.Fragment>
        <Button className='button-style' onClick={this.show} color='olive' animated='vertical' size='large'>
          <Button.Content visible><Icon name='sync alternate' />Update</Button.Content>
          <Button.Content hidden>Update Challenges</Button.Content>
        </Button>

        <Modal
          open={this.state.open}
          onClose={this.close}
          basic
          size='small'
        >
          <Header icon='trash alternate' content='Remove Organiser' />
          <Modal.Content>
            <p>
              Are you sure you want to remove (this organiser) from challenge {this.props.challenge + 1}?
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button color='red' inverted onClick={this.close}>
              <Icon name='remove' /> No
            </Button>
            <Button color='green' inverted onClick={this.delete}>
              <Icon name='checkmark' /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = {
  deleteOrgFromChallenge,
};

export default connect(null, mapDispatchToProps)(UpdateModal);