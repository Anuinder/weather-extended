import React from 'react';
import debounce from 'lodash.debounce';
import { connect } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { fetchWeatherData } from '../redux/actions.js';
import { fetchPlaceSuggestionsApi } from '../utils/apiRequests.js';
import classes from '../styles/searchbar.module.css';
import { SearchIcon } from '../assets/icons.js';

const theme = createTheme({
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        inputRoot: {
          fontSize: '1.1rem',
          color: 'white',
        },
        option: {
          color: 'white',
          background: 'transparent',
        },
        noOptions: {
          color: 'white',
        },
      },
    },
  },
});
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
    };
    this.handleDebouncedTextChange = debounce(this.handleTextChange, 1000);
  }

  /* value of textfield changes - populate suggestions*/
  handleTextChange = async (event) => {
    const place = event.target.value.trim();

    if (place === '') return;
    try {
      const options = await fetchPlaceSuggestionsApi(place);
      this.setState({ options });
    } catch (err) {
      console.log(err);
    }
  };

  /* value of autocomplete changes. - action weatherrequest */
  handleChange = (event, selectedOption) => {
    if (selectedOption === null) {
      this.setState({ options: [] });
      return;
    }
    this.props.fetchWeatherData(selectedOption, null);
  };

  render() {
    return (
      <>
        <span className={classes.inputBar}>
          <ThemeProvider theme={theme}>
            <Autocomplete
              id='combo-box-demo'
              options={this.state.options}
              getOptionLabel={(option) => option.city + ',' + option.state + ',' + option.country}
              onChange={this.handleChange}
              filterOptions={(options, state) => options}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder='Search for Weather here'
                  onChange={this.handleDebouncedTextChange}
                />
              )}
              fullWidth
              autoHighlight
            />
          </ThemeProvider>
        </span>
        <span className={classes.searchButton}>
          <FontAwesomeIcon icon={SearchIcon} className={classes.search} />
        </span>
      </>
    );
  }
}

export default connect(null, { fetchWeatherData })(SearchBar);
