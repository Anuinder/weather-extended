import IconCustom from './common/icons.js';

const DetailTile = (props) => (
  <div className={props.styles}>
    {props.icon ? <IconCustom icon={props.icon} /> : <span onClick={props.handleClick}>{props.heading}</span>}
    <span>{props.data}</span>
  </div>
);

export default DetailTile;
