import React, {Component} from 'react';
import NewOrganiserModal from 'components/modals/NewOrganiserModal';
import NewParticipantModal from 'components/modals/NewParticipantModal';
import AddToChallengeModal from 'components/modals/AddToChallengeModal';

class NestedAddModal extends Component {
  render() {
    return (
      <React.Fragment>
        <NewParticipantModal closeAddModal={this.props.closeAddModal}/>
        <NewOrganiserModal closeAddModal={this.props.closeAddModal}/>
        <AddToChallengeModal closeAddModal={this.props.closeAddModal}/>
      </React.Fragment>
    );
  }
}

export default NestedAddModal;
