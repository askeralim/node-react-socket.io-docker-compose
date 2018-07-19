import React, {Component} from 'react';
import { connect } from 'react-redux';
//import { selectBook } from '../actions/index';
import { bindActionCreators } from 'redux';

class WeatherList extends Component{
  renderList(cityData){
    const name = cityData.city.name;
    return (
          <tr key={name}>
            <td >{name}</td>
          </tr>
          //  onClick={()=>this.props.selectBook(book)}
      )
  }
  render(){
    return(
      <table className="table">
      <thead>
        <tr>
          <th>City</th>
          <th>Temperature</th>
          <th>Pressure</th>
          <th>Humidity</th>
        </tr>
      </thead>
      <tbody>
        {this.props.weather.map(this.renderList)}
      </tbody>
      </table>
    );
  }
}

function mapStateToProps({weather}){// picking weather as state.weather
  return {weather}//  {weather} is same as {weather:weather}
}
function mapDispatchToProps(dispath){
  return bindActionCreators({selectWeather : selectWeather}, dispath);
}

export default connect(mapStateToProps)(WeatherList);
