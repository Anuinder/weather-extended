import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { onDetailCardClose } from '../../redux/actions';

import {
  CloseIcon,
  LocationIcon,
  CloudIcon,
  VisibilityIcon,
  WindIcon,
  PressureIcon,
  HumidityIcon,
  SunriseIcon,
  SunsetIcon,
  UviIcon,
  getOpenWeatherIcons,
} from '../../assets/icons';
import { getDay, getDate, openWeatherUnitsList, getTime24Hour, getDayThisWeek } from '../../utils/dataModifier.js';
import IconCustom from '../icons.js';
import WeatherParameters from '../parameters.js';
import DetailTile from '../detailtile.js';
import HourlyTile from '../hourlytile';
import Temperature from '../temperature.js';
import classes from './index.module.css';

class DetailedCard extends React.Component {
  handleDetailCardClose = () => {
    this.props.onDetailCardClose();
  };

  render() {
    const { city, state, country, current, hourly, daily } = this.props.weatherData;

    // current weather data
    const currentDetails = [
      { icon: CloudIcon, data: current.clouds + openWeatherUnitsList.CLOUDY },
      { icon: VisibilityIcon, data: current.visibility + openWeatherUnitsList.VISIBILITY },
      { icon: WindIcon, data: current.wind_speed + openWeatherUnitsList.WIND_SPEED },
      { icon: PressureIcon, data: current.pressure + openWeatherUnitsList.PRESSURE },
      { icon: HumidityIcon, data: current.humidity + openWeatherUnitsList.HUMIDITY },
      { icon: UviIcon, data: current.uvi + openWeatherUnitsList.UV_INDEX },
    ];

    const date = `${getDay(current.dt)},${getDate(current.dt)}`;
    const temperature = current.temp;

    return (
      <div className={classes.detailedCard}>
        <section className={classes.header}>
          <div>
            <WeatherParameters parameter={city} styles={classes.place} />
            <FontAwesomeIcon icon={LocationIcon} className={classes.loc} />
          </div>
          <div onClick={this.handleDetailCardClose}>
            <FontAwesomeIcon icon={CloseIcon} className={classes.close} />
          </div>
        </section>

        <section className={classes.country}>
          ( <WeatherParameters parameter={state} styles={classes.country} />,
          <WeatherParameters parameter={country} styles={classes.country} />)
        </section>

        <section className={classes.date}>
          <WeatherParameters parameter={date} />
        </section>

        <section className={classes.temperature}>
          <IconCustom icon={getOpenWeatherIcons(current.weather[0].icon)} styles={classes.loc} />
          <Temperature parameter={temperature} />
          <WeatherParameters parameter={current.weather[0].description} styles={classes.maindesc} />
        </section>

        <section className={classes.additional}>
          {currentDetails.map((data, index) => (
            <DetailTile key={index} icon={data.icon} data={data.data} styles={classes.addtile}></DetailTile>
          ))}
        </section>

        <section className={classes.sunrise}>
          <IconCustom icon={SunriseIcon} styles={classes.sunicon} />
          {getTime24Hour(current.sunrise)}
        </section>

        <section className={classes.sunset}>
          <IconCustom icon={SunsetIcon} styles={classes.sunicon} />
          {getTime24Hour(current.sunset)}
        </section>

        <section className={classes.hourly}>
          {hourly.map((data, index) => (
            <HourlyTile
              key={index}
              icon={data.weather[0].icon}
              desc={data.weather[0].main}
              temperature={data.temp}
              time={getTime24Hour(data.dt)}
              rain={data.clouds}
            />
          ))}
        </section>

        <section className={classes.daily}>
          {daily.map((data, index) => (
            <HourlyTile
              key={index}
              icon={data.weather[0].icon}
              desc={data.weather[0].main}
              temperature={data.temp.day}
              time={getDayThisWeek(data.dt)}
              rain={data.clouds}
            />
          ))}
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  detailedCard: state.cards.detailedCard,

  weatherData: state.weather[state.cards.id],
});

//connect DetailedCard component to store
export default connect(mapStateToProps, { onDetailCardClose })(DetailedCard);
