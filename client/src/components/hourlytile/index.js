import Icons from '../icons.js';

import classes from './index.module.css';

const HourlyTile = (props) => (
  <div className={classes.tile}>
    <Icons icon={props.icon} />
    <span>{props.temperature}&deg;</span>
    <span>{props.time}</span>
    <span>{props.uvi}</span>
    <span className={classes.suffix}>uvi</span>
    <span>{props.rain}</span>
    <span className={classes.suffix}>%</span>
  </div>
);

export default HourlyTile;
