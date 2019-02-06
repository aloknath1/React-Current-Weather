import React, { Component } from 'react';
import $ from 'jquery'; 
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {      
      currLat: '',
      currLon: '',
      city: '',
      country: '',
      temp: '',
      tempCategory: 'Kelvin',
      currTempK: '',
      currTempF: '',
      currTempC: '',
      weatherMain: '',
      weatherDetail: '',
      display: 'none'
    };
  }

  getCurrentLocation(){
    console.log("current location is called...");
    $.get('http://ip-api.com/json', function (response) {
      console.log("User response is retrieved"); 
      console.log(response);
      if(response.status == "success"){
        this.setState({          
            currLat:response.lat,
            currLon:response.lon,
            city:response.city,
            country:response.country
        });
        
      }
      this.getWeather();
      //this.handleCelsius = this.handleCelsius().bind(this);
      //this.handleKelvin = this.handleKelvin().bind(this);
     // this.handleCelsius = this.handleCelsius().bind(this);

    }.bind(this));
  }

  getWeather(){
    var keyID = 'e75aa9eb22e3e903ba187251f2faa34f';
    $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + this.state.currLat + '&lon=' + this.state.currLon + '&appid=' + keyID, function (response) {
      console.log("Weather API is called...");
      console.log(response);
      var tempK = response.main.temp;
      var tempC = tempK - 273.15;
      var tempF = tempC * 1.8 + 32;

      this.setState({        
            currTempK: tempK.toString() + 'K',
            temp: tempK.toString() + 'K',
            currTempF: tempF.toFixed(2).toString() + '°F',
            currTempC: tempC.toFixed(2).toString() + '°C',  
            weatherMain: response.weather[0].main,
            weatherDetail: response.weather[0].description,            
            tempCategory: 'K',
            display:'block'
        });
    }.bind(this));
  }

  handleKelvin(){
    this.setState({ temp: this.state.currTempK, tempCategory: "K" });
  }

 handleCelsius(){
    this.setState({ temp: this.state.currTempK, tempCategory: "C" });
  }

 handleFarenheit(){
    this.setState({ temp: this.state.currTempK, tempCategory: "F" });
  }

  componentWillMount(){
    this.getCurrentLocation();
  }

 
  render() {
    return (
      <div className="App">
        <h1>Current Weather Service</h1>
        <h2>The current weather conditions are:</h2>
        <p className="weather">{this.state.weatherMain}, {this.state.weatherDetail}</p>
        <img src="http://i1361.photobucket.com/albums/r662/bonham000/Current%20Weather%20App/clouds_zpsimfgky1h.png" />
        <p className="temperature">{this.state.temp}{this.state.tempCategory}</p>
        <div className="toggleTemp">
          <div className="active" onclick={this.handleKelvin()}><p >Kelvin</p></div>
          <div onclick={this.handleCelsius()}><p>Celsius</p></div>
          <div onclick={this.handleFarenheit()}><p>Farenheit</p></div>
        </div>
        <div className="data">
          <p className="coordinates">Your coordinates are: {this.state.currLat}, {this.state.currLon}</p>
          <p className="city">Your city is: {this.state.city}, {this.state.country}</p>
        </div>
      </div>
    );
  }
}

export default App;
