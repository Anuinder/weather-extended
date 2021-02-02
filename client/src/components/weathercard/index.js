import React from 'react';
import { connect } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

import { onDetailCardOpen } from '../../redux/actions';
import { getOpenWeatherIcons } from '../../assets/icons';
import SearchBar from '../searchbar';
import IconCustom from '../icons.js';
import WeatherParameters from '../parameters.js';
import DetailTile from '../detailtile.js';
import { getDateTime, openWeatherUnitsList } from '../../utils/dataModifier.js';
import { CLOUDY, HUMIDITY, WIND_SPEED, PRESSURE } from '../../utils/weatherparameter.js';
import Temperature from '../temperature.js';

import classes from './index.module.css';
class WeatherCard extends React.Component {
  handleDetailCardOpen = (id) => {
    this.props.onDetailCardOpen(id);
  };

  render() {
    const { weatherData } = this.props;
    const { errorMsg, isFetching, id, ids } = weatherData;
    let dataUnavailable,
      currentDetails,
      temperature,
      date,
      place,
      icon,
      desc = undefined;

    // error in data fetch
    if (errorMsg !== null) {
      dataUnavailable = <Alert severity='error'>{errorMsg}</Alert>;
    }
    // waiting for data
    if (isFetching !== false) {
      dataUnavailable = <CircularProgress size={50} color='secondary' />;
    }

    // data fetch successful
    if (isFetching === false && errorMsg === null) {
      const { current, city } = weatherData[id];
      currentDetails = [
        { heading: CLOUDY, data: current.clouds + openWeatherUnitsList.CLOUDY },
        { heading: HUMIDITY, data: current.humidity + openWeatherUnitsList.HUMIDITY },
        { heading: WIND_SPEED, data: current.wind_speed + openWeatherUnitsList.WIND_SPEED },
        { heading: PRESSURE, data: current.pressure + openWeatherUnitsList.PRESSURE },
      ];
      temperature = current.temp;
      date = getDateTime(current.dt);
      place = city;
      icon = getOpenWeatherIcons(current.weather[0].icon);
      desc = current.weather[0].main;
    }

    return (
      <div className={classes.weathercard}>
        <section className={classes.search}>
          <SearchBar />
        </section>
        {dataUnavailable !== undefined ? (
          <>
            <section className={classes.summary}>{dataUnavailable}</section>
            <section className={classes.detail}>{dataUnavailable}</section>
          </>
        ) : (
          <>
            <section className={classes.summary} onClick={() => this.handleDetailCardOpen(id)}>
              <Temperature parameter={temperature} styles={classes.temperature} />
              <WeatherParameters parameter={place} styles={classes.place} />
              <WeatherParameters parameter={date} styles={classes.date} />
              <IconCustom icon={icon} styles={classes.icon} />
              <WeatherParameters parameter={desc} styles={classes.maindesc} />
            </section>
            <section className={classes.detail}>
              <span className={classes.heading}>Weather Details</span>
              {currentDetails.map((data, index) => (
                <DetailTile key={index} heading={data.heading} data={data.data} styles={classes.tile}></DetailTile>
              ))}
            </section>
          </>
        )}
        <section className={classes.recent}>
          <span className={classes.heading}>Recent Searches</span>
          {weatherData.ids.slice(0, -1).map((id, index) => (
            <DetailTile
              key={index}
              heading={weatherData[id].city}
              data={weatherData[id].current.temp}
              styles={classes.tile}
              handleClick={() => this.handleDetailCardOpen(id)}
            />
          ))}
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  detailedCard: state.cards.detailedCard,
  weatherData: state.weather,
});

export default connect(mapStateToProps, { onDetailCardOpen })(WeatherCard);
