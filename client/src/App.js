import React from 'react';
import { connect } from 'react-redux';

import { onDetailCardOpen } from './redux/actions';
import WeatherCards from './components/weathercard';
import DetailedCards from './components/detailedcard';

import classes from './App.module.css';
class App extends React.Component {
  handleDetailCardOpen = () => {
    this.props.onDetailCardOpen();
    // console.log(this.props)
  };
  componentDidMount() {
    console.log('compoenent did mount');
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude, ' ', position.coords.longitude);
    });
  }
  render() {
    return (
      <div className={classes.container}>
        <div className={classes.weatherScreen}>
          {this.props.detailedCard === false ? (
            <div className={classes.weatherWrapper}>
              <WeatherCards />
            </div>
          ) : (
            <div className={classes.detailedCardWrapper}>
              <DetailedCards />
            </div>
          )}
        </div>
      </div>
    );
  }
}

// connecting App to store
const mapStateToProps = (state) => ({
  detailedCard: state.cards.detailedCard,
});

export default connect(mapStateToProps, { onDetailCardOpen })(App);
