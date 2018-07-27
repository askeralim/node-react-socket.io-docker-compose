import React, {Component} from 'react';
import { connect } from 'react-redux';
import { searchChatRoom } from '../actions/index';
import { bindActionCreators } from 'redux';

class SearchBar extends Component{
  constructor(props){
    super(props);
    this.state={term:''};
    this.onSearchChange = this.onSearchChange.bind(this);
  }
  onSearchChange(event){
    this.setState({term:event.target.value});
    this.props.searchChatRoom(event.target.value);
  }

  render(){
    return(
        <div className="col-sm-12 searchBox-inner">
          <div className="form-group has-feedback">
            <input id="searchText" type="text" className="form-control" name="searchText" placeholder="Search"
              value={this.state.term}
              onChange={this.onSearchChange}/>
            <span className="glyphicon glyphicon-search form-control-feedback"></span>
          </div>
        </div>
    );
  }
}

function mapStateToProps(state){
  return {
      term : state.term
  }
}
function mapDispatchToProps(dispath){
  return bindActionCreators({searchChatRoom : searchChatRoom}, dispath);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
