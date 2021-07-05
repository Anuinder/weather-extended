import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { onDetailCardClose } from '../redux/actions.js';

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
} from '../assets/icons.js';
import { getDay, getDate, getDayThisWeek, openWeatherUnitsList, getTime24Hour } from '../utils/dataModifier.js';
import IconCustom from '../components/common/icons.js';
import DetailTile from '../components/detailtile.js';
import Temperature from '../components/temperature.js';
import HourlyTile from '../components/hourlytile.js';
import classes from '../styles/detailedcard.module.css';

class DetailedCardContainer extends React.Component {
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
            <span className={classes.place}>{city}</span>
            <FontAwesomeIcon icon={LocationIcon} className={classes.loc} />
          </div>
          <div onClick={this.handleDetailCardClose}>
            <FontAwesomeIcon icon={CloseIcon} className={classes.close} />
          </div>
        </section>

        <section className={classes.country}>
          ( <span className={classes.country}> {state}</span>,<span className={classes.country}>{state}</span>)
        </section>

        <section className={classes.date}>
          <span> {date}</span>
        </section>

        <section className={classes.temperature}>
          <IconCustom icon={getOpenWeatherIcons(current.weather[0].icon)} styles={classes.loc} />
          <Temperature parameter={temperature} />
          <span className={classes.maindesc}>{current.weather[0].description}</span>
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
              icon={getOpenWeatherIcons(data.weather[0].icon)}
              desc={data.weather[0].main}
              temperature={data.temp.toFixed(0)}
              time={getTime24Hour(data.dt)}
              rain={data.clouds}
              styles={{
                tile: classes.tile,
                suffix: classes.suffix,
              }}
            />
          ))}
        </section>

        <section className={classes.daily}>
          {daily.map((data, index) => (
            <HourlyTile
              key={index}
              icon={getOpenWeatherIcons(data.weather[0].icon)}
              desc={data.weather[0].main}
              temperature={data.temp.day.toFixed(0)}
              time={getDayThisWeek(data.dt)}
              rain={data.clouds}
              styles={{
                tile: classes.tile,
                suffix: classes.suffix,
              }}
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
export default connect(mapStateToProps, { onDetailCardClose })(DetailedCardContainer);
