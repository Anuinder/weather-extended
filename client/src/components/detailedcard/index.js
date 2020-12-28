import React from 'react';
import { connect } from 'react-redux';

import { onDetailCardClose } from '../../redux/actions';

import { regularClose, solidLocation, solidCloudRain, solidWind, solidSun } from '../../assets/icons';

import Icons from '../icons.js';
import Place from '../place.js';
import Date from '../date.js';
import Temperature from '../temperature.js';
import DetailTile from '../detailtile/index.js';
import HourlyTile from '../hourlytile';

import classes from './index.module.css';

class DetailedCard extends React.Component {
  state = {
    place: 'Weather in United Kingdom',
    date: "06:09-Monday,9 Sep'19",
    sunrise: '05:17',
    sunset: '20:17',
    temperature: '+23',
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
  };
  handleDetailCardClose = () => {
    this.props.onDetailCardClose();
  };

  render() {
    return (
      <div className={classes.detailedCard}>
        <section className={classes.header}>
          <div>
            <Place place={this.state.place} styles={classes.place} />
            <Icons icon={solidLocation} styles={classes.loc} />
          </div>
          <div onClick={this.handleDetailCardClose}>
            <Icons icon={regularClose} styles={classes.close} />
          </div>
        </section>
        <section className={classes.date}>
          <Date date={this.state.date} />
        </section>
        <section className={classes.temperature}>
          <Icons icon={solidCloudRain} />
          <Temperature temperature={this.state.temperature} />
          <p className={classes.maindesc}>{this.state.maindesc}</p>
        </section>
        <section className={classes.additional}>
          <DetailTile data={this.state.add.clouds} icon={solidCloudRain} styles={classes.addtile} />
          <DetailTile data={this.state.add.visibility} icon={solidCloudRain} styles={classes.addtile} />
          <DetailTile data={this.state.add.wind_speed} icon={solidWind} styles={classes.addtile} />
          <DetailTile data={this.state.add.pressure} icon={solidCloudRain} styles={classes.addtile} />
          <DetailTile data={this.state.add.humidity} icon={solidCloudRain} styles={classes.addtile} />
          <DetailTile data={this.state.add.uvi} icon={solidCloudRain} styles={classes.addtile} />
        </section>
        <section className={classes.sunrise}>
          <Icons icon={solidSun} styles={classes.sunicon} />
          {this.state.sunrise}
        </section>
        <section className={classes.sunset}>
          <Icons icon={solidSun} styles={classes.sunicon} />
          {this.state.sunset}
        </section>

        <section className={classes.hourly}>
          <HourlyTile
            icon={solidCloudRain}
            temperature={this.state.temperature}
            time={'3pm'}
            uvi={this.state.add.uvi}
            rain={this.state.add.clouds}
          />
          <HourlyTile
            icon={solidCloudRain}
            temperature={this.state.temperature}
            time={'3pm'}
            uvi={this.state.add.uvi}
            rain={this.state.add.clouds}
          />
          <HourlyTile
            icon={solidCloudRain}
            temperature={this.state.temperature}
            time={'3pm'}
            uvi={this.state.add.uvi}
            rain={this.state.add.clouds}
          />
          <HourlyTile
            icon={solidCloudRain}
            temperature={this.state.temperature}
            time={'3pm'}
            uvi={this.state.add.uvi}
            rain={this.state.add.clouds}
          />
          <HourlyTile
            icon={solidCloudRain}
            temperature={this.state.temperature}
            time={'3pm'}
            uvi={this.state.add.uvi}
            rain={this.state.add.clouds}
          />
          <HourlyTile
            icon={solidCloudRain}
            temperature={this.state.temperature}
            time={'3pm'}
            uvi={this.state.add.uvi}
            rain={this.state.add.clouds}
          />
          <HourlyTile
            icon={solidCloudRain}
            temperature={this.state.temperature}
            time={'3pm'}
            uvi={this.state.add.uvi}
            rain={this.state.add.clouds}
          />
        </section>

        <section className={classes.daily}>
          <HourlyTile
            icon={solidCloudRain}
            temperature={this.state.temperature}
            time={'Today'}
            uvi={this.state.add.uvi}
            rain={this.state.add.clouds}
          />
          <HourlyTile
            icon={solidCloudRain}
            temperature={this.state.temperature}
            time={'Today'}
            uvi={this.state.add.uvi}
            rain={this.state.add.clouds}
          />

          <HourlyTile
            icon={solidCloudRain}
            temperature={this.state.temperature}
            time={'Today'}
            uvi={this.state.add.uvi}
            rain={this.state.add.clouds}
          />
          <HourlyTile
            icon={solidCloudRain}
            temperature={this.state.temperature}
            time={'Today'}
            uvi={this.state.add.uvi}
            rain={this.state.add.clouds}
          />
          <HourlyTile
            icon={solidCloudRain}
            temperature={this.state.temperature}
            time={'Today'}
            uvi={this.state.add.uvi}
            rain={this.state.add.clouds}
          />
        </section>
      </div>
    );
  }
}
//connect DetailedCard component to store
export default connect(null, { onDetailCardClose })(DetailedCard);
