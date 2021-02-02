import React from 'react';
import debounce from 'lodash.debounce';
import { connect } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import Icons from '../icons.js';
import { solidSearch } from '../../assets/icons.js';
import { fetchWeatherData } from '../../redux/actions.js';
import { fetchPlaceSuggestionsApi } from '../../utils/apiRequests.js';
import classes from './index.module.css';

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
    console.log('handleTextChange', place);
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
    console.log('handle change selected option is' + selectedOption);
    if (selectedOption === null) {
      this.setState({ options: [] });
      return;
    }
    this.props.fetchWeatherData(selectedOption, null);

    // this.setState({ selectedvalue: value });
  };

  render() {
    return (
      <section className={classes.searchBar}>
        <span className={classes.inputBar}>
          <Autocomplete
            id='combo-box-demo'
            options={this.state.options}
            getOptionLabel={(option) => option.city + ',' + option.state + ',' + option.country}
            style={{ width: 300 }}
            onChange={this.handleChange}
            filterOptions={(options, state) => options}
            renderInput={(params) => (
              <TextField {...params} placeholder='Search for Weather here' onChange={this.handleDebouncedTextChange} />
            )}
          />
        </span>
        {/* <button type='button' className={classes.searchButton} onClick={this.handleSearchClick}>
          <Icons icon={solidSearch} />
        </button> */}
      </section>
    );
  }
}

export default connect(null, { fetchWeatherData })(SearchBar);
