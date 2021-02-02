import React from 'react';
import { connect } from 'react-redux';

import { fetchWeatherData } from './redux/actions';
import WeatherCards from './components/weathercard';
import DetailedCards from './components/detailedcard';

import classes from './App.module.css';
class App extends React.Component {
  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude, ' ', position.coords.longitude);
      this.props.fetchWeatherData(null, { lat: position.coords.latitude, lng: position.coords.longitude });
    });
  }
  render() {
    return (
      <div className={classes.container}>
        <div className={classes.weatherScreen}>
          <div className={classes.weatherWrapper}>
            {this.props.detailedCard === false ? <WeatherCards /> : <DetailedCards />}
          </div>
        </div>
      </div>
    );
  }
}

// connecting App to store
const mapStateToProps = (state) => ({
  detailedCard: state.cards.detailedCard,
});

export default connect(mapStateToProps, { fetchWeatherData })(App);
