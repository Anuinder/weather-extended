import Alert from '@material-ui/lab/Alert';

const Error = (props) => <Alert severity='error'>{props.errorMsg}</Alert>;

export default Error;
