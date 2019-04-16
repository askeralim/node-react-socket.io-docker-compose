import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBar from '../container/searchbar.js'
import ChatRoomList from '../container/chatroom-list.js'
import MessagePanel from '../container/message-panel.js'
import io from "socket.io-client"
import socket from "./socket.js"
import Dialog from 'react-bootstrap-dialog'
import { createChatRoom, logOffFromChatServer } from '../actions/index';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { modalIsOpen: false };
    this.openCreateChatRoomModal = this.openCreateChatRoomModal.bind(this)
    this.handleWindowClose = this.handleWindowClose.bind(this)
  }
  componentDidMount() {
    window.addEventListener('onbeforeunload', this.handleWindowClose);
  }
  componentWillUnmount() {
     //console.log('Unmounting APP Component ::::::::::::::');
     window.removeEventListener('onbeforeunload', this.handleWindowClose);
  }
  handleWindowClose(){
    this.props.dispatch(logOffFromChatServer(socket));
  }
  openCreateChatRoomModal() {
   this.setState({modalIsOpen: true});
   this.dialog.show({
     body: 'Chat room Name Please..',
     prompt: Dialog.TextPrompt({initialValue: 'Weekend Hangout',placeholder: 'Chat room Name'}),
     actions: [
       Dialog.OKAction((dialog) => {
         const result = dialog.value
         if(result && result.length >0){
           this.setState({modalIsOpen: false});
         }
         this.props.dispatch(createChatRoom(socket, result));
       })
     ],
     onHide: (dialog) => {  }
   })
 }
  render() {
    return (
      <div className="row app-one">
        <div className="col-sm-4 side">
          <div className="side-one">
            <div className="row heading">
            <div className="col-sm-6 col-xs-6 heading-avatar">
                <div className="heading-avatar-icon">
                  <a className="heading-name-meta">{this.props.loggedInUser.get('name')}</a>
                </div>
              </div>
              <div className="col-sm-2 col-xs-2 heading-compose  pull-right" onClick={this.openCreateChatRoomModal}>
                <i className="fa fa-comments fa-2x  pull-right" aria-hidden="true"></i>
              </div>
            </div>
            <div className="row searchBox">
              <SearchBar />
            </div>
            <div className="row sideBar">
              <ChatRoomList />
            </div>
          </div>
        </div>
        <MessagePanel />
        <Dialog ref={(el) => { this.dialog = el }} />
      </div>
    );
  }
}

function mapStateToProps({loggedInUser}){// picking weather as state.weather
  return {loggedInUser}//  {weather} is same as {weather:weather}
}
export default connect(mapStateToProps)(App);
