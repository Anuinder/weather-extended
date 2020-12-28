import Icons from '../icons.js';

import classes from './index.module.css';

const DetailTile = (props) => (
  <div className={`${classes.tile} ${props.styles}`}>
    {props.icon ? <Icons icon={props.icon} /> : <span>{props.heading}</span>}
    <span>{props.data}</span>
  </div>
);

export default DetailTile;
