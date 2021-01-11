import React from 'react';
import { connect } from 'react-redux';

import { onDetailCardOpen, fetchWeatherData } from '../../redux/actions';
import { solidCloudRain } from '../../assets/icons';
import SearchBar from '../searchbar';
import Icons from '../icons.js';
import Place from '../place.js';
import Date from '../date.js';
import Temperature from '../temperature.js';
import DetailTile from '../detailtile/index.js';

import classes from './index.module.css';

class WeatherCard extends React.Component {
  state = {
    place: 'United Kingdom',
    date: "06:09-Monday,9 Sep'19",
    sunrise: '05:17',
    sunset: '20:17',
    temperature: '23',
    add: {
      clouds: 90,
      visibility: 6437,
      wind_speed: 3.6,
      wind_deg: 320,
      pressure: 1017,
      humidity: 96,
      uvi: 0,
    },

    maindesc: 'thunderstorm with light drizzle',
    main: 'cloudy',
  };

  handleDetailCardOpen = () => {
    this.props.onDetailCardOpen();
    // console.log(this.props)
  };
  render() {
    const { id, name, email, fetchWeatherData } = this.props;
    console.log(id, ' ', name, ' ', fetchWeatherData);

    return (
      <div className={classes.weathercard}>
        <section className={classes.search}>
          <SearchBar />
        </section>
        <section className={classes.summary} onClick={this.handleDetailCardOpen}>
          <Temperature temperature={this.state.temperature} styles={classes.temperature} />
          <Place place={this.state.place} styles={classes.place} />
          <Date date={this.state.date} styles={classes.date} />
          <Icons icon={solidCloudRain} styles={classes.icon} />
          <span className={classes.maindesc}>{this.state.main}</span>
        </section>
        <section className={classes.detail}>
          <span className={classes.heading}>Weather Details</span>
          <DetailTile heading={'Cloudy'} data={this.state.add.clouds} styles={classes.tile} />
          <DetailTile heading={'Humidity'} data={this.state.add.clouds} styles={classes.tile} />
          <DetailTile heading={'Wind'} data={this.state.add.wind_speed} styles={classes.tile} />
          <DetailTile heading={'pressure'} data={this.state.add.pressure} styles={classes.tile} />
        </section>
        <section className={classes.recent}>
          <span className={classes.heading}>Recent Searches</span>
          <DetailTile heading={'UK'} data={'23'} styles={classes.tile} />
          <DetailTile heading={'UK'} data={'23'} styles={classes.tile} />
          <DetailTile heading={'UK'} data={'23'} styles={classes.tile} />
          <DetailTile heading={'UK'} data={'23'} styles={classes.tile} />
          <DetailTile heading={'UK'} data={'23'} styles={classes.tile} />
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  detailedCard: state.cards.detailedCard,
});

export default connect(mapStateToProps, { onDetailCardOpen, fetchWeatherData })(WeatherCard);
