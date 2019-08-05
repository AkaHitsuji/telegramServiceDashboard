import React, {Component} from 'react';
import {Button, Header, Icon, Modal} from 'semantic-ui-react';
import {connect} from 'react-redux';

import {deleteOrgFromChallenge, deleteParticipant} from 'actions';

class DeleteModal extends Component {
  state = {
    open: false,
    content: '',
  }

  componentDidMount() {
    switch (this.props.type) {
      case 'participant':
        this.setState({content: 'Do you want to remove this participant?'});
        break;
      case 'organiser':
        this.setState({content: 'Do you want to remove this organiser?'});
        break;
      case 'challenge':
        this.setState({content: 'Are you sure you want to remove (this organiser) from challenge {this.props.challenge + 1}?'});
        break;
      default:
        break;
    }
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
    switch (this.props.type) {
      case 'participant':
        this.props.deleteParticipant(this.props.participant);
        break;
      case 'organiser':
        this.setState({content: 'Do you want to remove this organiser?'});
        break;
      case 'challenge':
        this.props.deleteOrgFromChallenge(this.props.challenge, this.props.organiser);
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div>
        <Button onClick={this.show} color='violet' animated='vertical'>
          <Button.Content visible>Delete</Button.Content>
          <Button.Content hidden><Icon name='trash alternate' /></Button.Content>
        </Button>

        <Modal
          open={this.state.open}
          onClose={this.close}
          basic
          size='small'
        >
          <Header icon='trash alternate' content={`Remove ${this.props.type}`}/>
          <Modal.Content>
            <p>
              {this.state.content}
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
  deleteParticipant,
};

export default connect(null, mapDispatchToProps)(DeleteModal);
