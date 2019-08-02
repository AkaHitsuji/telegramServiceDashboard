import React, {Component} from 'react';
import {Button, Header, Icon, Modal} from 'semantic-ui-react';
import {connect} from 'react-redux';

import {deleteOrgFromChallenge} from 'actions';

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

  delete = () => {
    this.close();
    this.props.deleteOrgFromChallenge(this.props.challenge, this.props.organiser);
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
      </div>
    );
  }
}

const mapDispatchToProps = {
  deleteOrgFromChallenge,
};

export default connect(null, mapDispatchToProps)(DeleteModal);
