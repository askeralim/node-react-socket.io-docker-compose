import React, { Component } from 'react';

export default class ReceivedMessage extends Component {
  render() {
    return (
      <div className="row message-body" key={this.props.message.get('id')}>
        <div className="col-sm-12 message-main-receiver">
          <div className="receiver">
            <div className="message-text">
             {this.props.message.get('message')}
            </div>
            <span className="message-time pull-right">
              {this.props.message.get('time')}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
