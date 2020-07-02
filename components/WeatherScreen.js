import React, {Component} from 'react';
import { FlatList } from 'react-native';
import ForecastCard from './ForecastCard';
import Geolocation from '@react-native-community/geolocation';


export default class WeatherScreen extends React.Component {

	constructor(props){
		super(props); 
		this.state = {
			latitude: 0,
			longitude: 0,
			forecast: [],
			error:''
		};
	}

	componentDidMount(){
    // Get the user's location
    this.getLocation();
	}

	getLocation(){
    Geolocation.getCurrentPosition(info => this.getWeather(info));
	}

	getWeather= (info) => {
		// Construct the API url to call
		let url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + info.coords.latitude + '&lon=' + info.coords.longitude + '&units=metric&appid=67e37c3fc00ce4500497465acf2cb130';

		// Call the API, and set the state of the weather forecast
		fetch(url)
		.then(response => response.json())
		.then(data => {
			this.setState((prevState, props) => ({
				forecast: data
			}));
		})
	}

	render() {
		return (
      <FlatList 
        data={this.state.forecast.list}
        style={{marginTop:20}}
        keyExtractor={item => item.dt_txt}
        renderItem={({item}) => 
          <ForecastCard detail={item} location={this.state.forecast.city.name} />
        } 
      />
		);
	}
}