import React, {Component} from 'react';
import { connect } from 'react-redux';
import { featchWeather } from '../actions/index';
import { bindActionCreators } from 'redux';

class SearchBar extends Component{
  constructor(props){
    super(props);
    this.state={term:''};
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  onSearchChange(event){
    this.setState({term:event.target.value});
    //this.props.onSearchChange(term);
  //  console.log('New Value ', event.target.value);
  }
  onFormSubmit(event){
    event.preventDefault();
    //console.log('Form Submitting');
    this.setState({term:''});
    this.props.featchWeather(this.state.term);
  }
  render(){
    return(
      <form className='input-group' onSubmit={this.onFormSubmit}>
        <input
            className='form-control'
            value={this.state.term}
            onChange={this.onSearchChange}/>
        <span className='input-group-btn'>
          <button type='submit' className='btn btn-secondary' >Submit</button>
        </span>
      </form>
    );
  }
}

function mapStateToProps(state){
  return {
      term : state.term
  }
}
function mapDispatchToProps(dispath){
  return bindActionCreators({featchWeather : featchWeather}, dispath);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
