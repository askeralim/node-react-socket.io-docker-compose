import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBar from '../container/searchbar.js'
import ChatRoomList from '../container/chatroom-list.js'
import MessagePanel from '../container/message-panel.js'
import io from "socket.io-client"
import socket from "./socket.js"
import Dialog from 'react-bootstrap-dialog'
import { createChatRoom } from '../actions/index';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { modalIsOpen: false };
    this.openCreateChatRoomModal = this.openCreateChatRoomModal.bind(this)
  }
 componentWillUnmount() {
     //socket.disconnect()
     console.log('Unmounting APP Component ::::::::::::::');
  // alert("Disconnecting Socket as component will unmount")
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

          <div className="side-two">

            <div className="row newMessage-heading">
              <div className="row newMessage-main">
                <div className="col-sm-2 col-xs-2 newMessage-back">
                  <i className="fa fa-arrow-left" aria-hidden="true"></i>
                </div>
                <div className="col-sm-10 col-xs-10 newMessage-title">
                  New Chat
                </div>
              </div>
            </div>
            <div className="row composeBox">
              <div className="col-sm-12 composeBox-inner">
                <div className="form-group has-feedback">
                  <input id="composeText" type="text" className="form-control" name="searchText" placeholder="Search People" />
                  <span className="glyphicon glyphicon-search form-control-feedback"></span>
                </div>
              </div>
            </div>
            <div className="row compose-sideBar">
              <div className="row sideBar-body">
                <div className="col-sm-3 col-xs-3 sideBar-avatar">
                  <div className="avatar-icon">
                    <img src="img/man.ico" />
                  </div>
                </div>
                <div className="col-sm-9 col-xs-9 sideBar-main">
                  <div className="row">
                    <div className="col-sm-8 col-xs-8 sideBar-name">
                      <span className="name-meta">Ankit Jain
                    </span>
                    </div>
                    <div className="col-sm-4 col-xs-4 pull-right sideBar-time">
                      <span className="time-meta pull-right">18:18
                    </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row sideBar-body">
                <div className="col-sm-3 col-xs-3 sideBar-avatar">
                  <div className="avatar-icon">
                    <img src="img/man.ico" />
                  </div>
                </div>
                <div className="col-sm-9 col-xs-9 sideBar-main">
                  <div className="row">
                    <div className="col-sm-8 col-xs-8 sideBar-name">
                      <span className="name-meta">Ankit Jain
                    </span>
                    </div>
                    <div className="col-sm-4 col-xs-4 pull-right sideBar-time">
                      <span className="time-meta pull-right">18:18
                    </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row sideBar-body">
                <div className="col-sm-3 col-xs-3 sideBar-avatar">
                  <div className="avatar-icon">
                    <img src="img/man.ico" />
                  </div>
                </div>
                <div className="col-sm-9 col-xs-9 sideBar-main">
                  <div className="row">
                    <div className="col-sm-8 col-xs-8 sideBar-name">
                      <span className="name-meta">Ankit Jain
                    </span>
                    </div>
                    <div className="col-sm-4 col-xs-4 pull-right sideBar-time">
                      <span className="time-meta pull-right">18:18
                    </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row sideBar-body">
                <div className="col-sm-3 col-xs-3 sideBar-avatar">
                  <div className="avatar-icon">
                    <img src="img/man.ico" />
                  </div>
                </div>
                <div className="col-sm-9 col-xs-9 sideBar-main">
                  <div className="row">
                    <div className="col-sm-8 col-xs-8 sideBar-name">
                      <span className="name-meta">Ankit Jain
                    </span>
                    </div>
                    <div className="col-sm-4 col-xs-4 pull-right sideBar-time">
                      <span className="time-meta pull-right">18:18
                    </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row sideBar-body">
                <div className="col-sm-3 col-xs-3 sideBar-avatar">
                  <div className="avatar-icon">
                    <img src="img/man.ico" />
                  </div>
                </div>
                <div className="col-sm-9 col-xs-9 sideBar-main">
                  <div className="row">
                    <div className="col-sm-8 col-xs-8 sideBar-name">
                      <span className="name-meta">Ankit Jain
                    </span>
                    </div>
                    <div className="col-sm-4 col-xs-4 pull-right sideBar-time">
                      <span className="time-meta pull-right">18:18
                    </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row sideBar-body">
                <div className="col-sm-3 col-xs-3 sideBar-avatar">
                  <div className="avatar-icon">
                    <img src="img/man.ico" />
                  </div>
                </div>
                <div className="col-sm-9 col-xs-9 sideBar-main">
                  <div className="row">
                    <div className="col-sm-8 col-xs-8 sideBar-name">
                      <span className="name-meta">Ankit Jain
                    </span>
                    </div>
                    <div className="col-sm-4 col-xs-4 pull-right sideBar-time">
                      <span className="time-meta pull-right">18:18
                    </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row sideBar-body">
                <div className="col-sm-3 col-xs-3 sideBar-avatar">
                  <div className="avatar-icon">
                    <img src="img/man.ico" />
                  </div>
                </div>
                <div className="col-sm-9 col-xs-9 sideBar-main">
                  <div className="row">
                    <div className="col-sm-8 col-xs-8 sideBar-name">
                      <span className="name-meta">Ankit Jain
                    </span>
                    </div>
                    <div className="col-sm-4 col-xs-4 pull-right sideBar-time">
                      <span className="time-meta pull-right">18:18
                    </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row sideBar-body">
                <div className="col-sm-3 col-xs-3 sideBar-avatar">
                  <div className="avatar-icon">
                    <img src="img/man.ico" />
                  </div>
                </div>
                <div className="col-sm-9 col-xs-9 sideBar-main">
                  <div className="row">
                    <div className="col-sm-8 col-xs-8 sideBar-name">
                      <span className="name-meta">Ankit Jain
                    </span>
                    </div>
                    <div className="col-sm-4 col-xs-4 pull-right sideBar-time">
                      <span className="time-meta pull-right">18:18
                    </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row sideBar-body">
                <div className="col-sm-3 col-xs-3 sideBar-avatar">
                  <div className="avatar-icon">
                    <img src="img/man.ico" />
                  </div>
                </div>
                <div className="col-sm-9 col-xs-9 sideBar-main">
                  <div className="row">
                    <div className="col-sm-8 col-xs-8 sideBar-name">
                      <span className="name-meta">Ankit Jain
                    </span>
                    </div>
                    <div className="col-sm-4 col-xs-4 pull-right sideBar-time">
                      <span className="time-meta pull-right">18:18
                    </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row sideBar-body">
                <div className="col-sm-3 col-xs-3 sideBar-avatar">
                  <div className="avatar-icon">
                    <img src="img/man.ico" />
                  </div>
                </div>
                <div className="col-sm-9 col-xs-9 sideBar-main">
                  <div className="row">
                    <div className="col-sm-8 col-xs-8 sideBar-name">
                      <span className="name-meta">Ankit Jain
                    </span>
                    </div>
                    <div className="col-sm-4 col-xs-4 pull-right sideBar-time">
                      <span className="time-meta pull-right">18:18
                    </span>
                    </div>
                  </div>
                </div>
              </div>
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
/*function mapDispatchToProps(dispatch){
  return bindActionCreators({selectChatRoom : selectChatRoom}, dispatch);
}*/

export default connect(mapStateToProps)(App);
