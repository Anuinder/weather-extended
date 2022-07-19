import React from 'react';
import { connect } from 'react-redux';

import { onDetailCardOpen, fetchWeatherData } from '../redux/actions';
import Error from '../components/common/error.js';
import Loading from '../components/common/loading.js';
import SearchBar from './searchbar';
import Summary from '../components/summary.js';
import InfoCard from '../components/infocard.js';
import { CLOUDY, HUMIDITY, WIND_SPEED, PRESSURE, openWeatherUnitsList } from '../utils/dataModifier.js';
import { getOpenWeatherIcons } from '../assets/icons.js';

import classes from '../styles/weathercard.module.css';

class WeatherCardContainer extends React.Component {
  handleDetailCardOpen = (id) => {
    this.props.onDetailCardOpen(id);
  };

  render() {
    const { weatherData } = this.props;
    const { errorMsg, isFetching, id, ids } = weatherData;
    let dataUnavailable = null;
    let recentSearch = [];

    // data of previously searched places
    if (weatherData.ids.length > 1) {
      recentSearch = ids.slice(0, -1).map((id) => ({
        id: id,
        heading: weatherData[id].city,
        data: weatherData[id].current.temp,
      }));
    }

    // error in data fetch
    if (errorMsg) {
      dataUnavailable = <Error errorMsg={errorMsg} />;
    }

    // waiting for data
    if (isFetching) {
      dataUnavailable = <Loading />;
    }

    // data fetch successful
    if (!isFetching && !errorMsg) {
      const { current, city } = weatherData[id];
      const currentDetails = [
        { heading: CLOUDY, data: current.clouds + openWeatherUnitsList.CLOUDY },
        { heading: HUMIDITY, data: current.humidity + openWeatherUnitsList.HUMIDITY },
        { heading: WIND_SPEED, data: current.wind_speed + openWeatherUnitsList.WIND_SPEED },
        { heading: PRESSURE, data: current.pressure + openWeatherUnitsList.PRESSURE },
      ];

      dataUnavailable = (
        <>
          <section className={classes.summary} onClick={() => this.handleDetailCardOpen(id)}>
            <Summary
              place={city}
              temperature={current.temp.toFixed(0)}
              date={current.dt}
              icon={getOpenWeatherIcons(current.weather[0].icon)}
              desc={current.weather[0].main}
              styles={{
                place: classes.place,
                temperature: classes.temperature,
                date: classes.date,
                icon: classes.icon,
                maindesc: classes.maindesc,
              }}
            />
          </section>
          <section className={classes.detail}>
            <InfoCard
              heading={`Weather Details`}
              data={currentDetails}
              styles={{
                heading: classes.heading,
                tile: classes.tile,
              }}
            />
          </section>
        </>
      );
    }

    return (
      <div className={classes.weathercard}>
        <section className={classes.search}>
          <SearchBar />
        </section>
        <section className={classes.recent}>
          <InfoCard
            heading={`Recent Searches`}
            data={recentSearch}
            styles={{
              heading: classes.heading,
              tile: classes.tile,
            }}
            handleClick={this.handleDetailCardOpen}
          />
        </section>
        {dataUnavailable}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  detailedCard: state.cards.detailedCard,
  weatherData: state.weather,
});

export default connect(mapStateToProps, { onDetailCardOpen, fetchWeatherData })(WeatherCardContainer);
