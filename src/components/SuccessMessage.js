import React, {Component} from 'react';
import {Message, Icon} from 'semantic-ui-react';

class SuccessMessage extends Component {
  render() {
    return (
      <Message success icon>
        <Icon name='thumbs up' />
        <Message.Content>
          {this.props.message}
        </Message.Content>
      </Message>
    );
  }
}

export default SuccessMessage;
