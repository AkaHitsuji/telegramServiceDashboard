import React, {Component} from 'react';
import {Message, Icon} from 'semantic-ui-react';

class LoadingMessage extends Component {
  render() {
    return (
      <Message icon>
        <Icon name='circle notched' loading />
        <Message.Content>
          {this.props.message}
        </Message.Content>
      </Message>
    );
  }
}

export default LoadingMessage;
