import Icons from './common/icons.js';

const HourlyTile = ({ styles, icon, temperature, time, uvi, rain }) => (
  <div className={styles.tile}>
    <Icons icon={icon} />
    <span>{temperature}&deg;</span>
    <span>{time}</span>
    <span>{uvi}</span>
    <span className={styles.suffix}>uvi</span>
    <span>{rain}</span>
    <span className={styles.suffix}>%</span>
  </div>
);

export default HourlyTile;
