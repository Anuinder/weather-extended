import Skeleton from '@material-ui/lab/Skeleton';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = (props) => (
  <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
    <CircularProgress size={70} color='secondary' />
    <Skeleton variant='circle' width={70} height={70} animation='wave' />

    <CircularProgress size={50} color='secondary' />
    <Skeleton variant='circle' width={50} height={50} animation='wave' />

    <CircularProgress size={30} color='secondary' />
    <Skeleton variant='circle' width={30} height={30} animation='wave' />
  </div>
);

export default Loading;
