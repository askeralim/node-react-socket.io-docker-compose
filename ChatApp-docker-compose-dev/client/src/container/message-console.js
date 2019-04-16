import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendChatMessage,sendChatMessageAction } from '../actions/index';
import { bindActionCreators } from 'redux';

class MessageConsole extends Component {
  constructor(props){
    super(props);
    this.state={chatText:''};
    this.onDataEnter = this.onDataEnter.bind(this);
  }
  onDataEnter = (e) => {
      this.setState({chatText:e.target.value});
  }
  keyDown(component, event){
     if(event.keyCode == 13 && event.shiftKey == false){
       event.preventDefault();
       const fromId = component.props.loggedInUser.get('id');
       const fromName = component.props.loggedInUser.get('name')
       const toId = component.props.activeChatRoom.get('id');
       const toName = component.props.activeChatRoom.get('name');
       component.props.dispatch(sendChatMessageAction(event.target.value, fromId, toId, component.props.activeChatRoom.get('type'),fromName, toName ));
       component.setState({chatText:''});
     }
  }
  render() {
    return (
      <div className="row reply">
        <div className="col-sm-1 col-xs-1 reply-emojis">
          <i className="fa fa-smile-o fa-2x"></i>
        </div>
        <div className="col-sm-9 col-xs-9 reply-main">
          <textarea className="form-control" value={this.state.chatText} rows="1" id="comment"  onChange={this.onDataEnter} onKeyDown={(event)=>this.keyDown(this, event)}></textarea>
        </div>
        <div className="col-sm-1 col-xs-1 reply-recording">
          <i className="fa fa-microphone fa-2x" aria-hidden="true"></i>
        </div>
        <div className="col-sm-1 col-xs-1 reply-send">
          <i className="fa fa-send fa-2x" aria-hidden="true"></i>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state){
  return {
      chatText : state.chatText
  }
}
function mapDispatchToProps(dispath){
  return bindActionCreators({sendChatMessage : sendChatMessage}, dispath);
}

export default connect(mapStateToProps)(MessageConsole);
