import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Chart from '../components/chart.js';
import GoogleMap from '../components/google-map.js';

class WeatherList extends Component{
  renderList(cityData){
    if(!cityData)
      return (<tr><td colspan='4'>No Data Found </td></tr>)
    console.log('Rendering :.....',cityData);
    const name = cityData.city.name;
    //console.log(cityData.list);
    const tempData = cityData.list.map((w)=>{ return w.main.temp});
    const pressureData = cityData.list.map((w)=>{ return w.main.pressure});
    const humidityData = cityData.list.map((w)=>{ return w.main.humidity});
    const {lon, lat} = cityData.city.coord;

    return (
          <tr key={name}>
            <td ><GoogleMap lat={lat} lon={lon} /></td>
            <td >
              <Chart data={tempData} color="red" unit="K"/>
            </td>
            <td >
              <Chart data={pressureData} color="blue" unit="hPa"/>
            </td>
            <td >
              <Chart data={humidityData} color="green" unit="%"/>
            </td>
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
          <th>Temperature (K)</th>
          <th>Pressure(hPa)</th>
          <th>Humidity(%)</th>
        </tr>
      </thead>
      <tbody>
        { this.props.weather.map(this.renderList)}
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
