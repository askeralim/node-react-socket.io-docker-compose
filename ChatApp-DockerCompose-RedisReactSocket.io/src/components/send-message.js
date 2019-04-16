import React, { Component } from 'react';

export default class SenderMessage extends Component {
  render() {
    return (
      <div className="row message-body" key={this.props.message.get('id')}>
        <div className="col-sm-12 message-main-sender">
          <div className="sender">
            <h5><span>{this.props.message.get('fromName')+'...'}</span></h5>
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
