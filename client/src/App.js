import React from 'react';
import { connect } from 'react-redux';

import { fetchWeatherData } from './redux/actions';
import WeatherCardContainer from './containers/weathercard.js';
import DetailedCardContainer from './containers/detailedcard.js';

import classes from './styles/App.module.css';
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
            {this.props.detailedCard === false ? <WeatherCardContainer /> : <DetailedCardContainer />}
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
