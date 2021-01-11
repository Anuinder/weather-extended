import React from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { connect } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import Icons from '../icons.js';
import { solidSearch } from '../../assets/icons.js';
import { fetchWeatherData } from '../../redux/actions.js';

import classes from './index.module.css';

const fetchPlaceSuggestionsApi = async (place) => {
  console.log('fetchapi', place);
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');

  const options = response.data.map((option) => {
    const item = {
      id: option.id,
      name: option.name,
    };
    return item;
  });
  return options;
};
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      selectedvalue: '',
    };
    this.handleDebouncedTextChange = debounce(this.handleTextChange, 600);
  }

  /* value of autocomplete changes. - action weatherrequest */
  handleChange = (event, selectedOption) => {
    if (selectedOption === null) {
      this.setState({ options: [] });
      return;
    }
    console.log(' handleChange', ' ', selectedOption);
    this.props.fetchWeatherData(selectedOption);
    // fetchPlaceCoordinates
    // make weatherApirequest - value - id,name

    // this.setState({ selectedvalue: value });
  };

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

  render() {
    return (
      <section className={classes.searchBar}>
        <span className={classes.inputBar}>
          <Autocomplete
            id='combo-box-demo'
            options={this.state.options}
            getOptionLabel={(option) => option.name}
            style={{ width: 300 }}
            onChange={this.handleChange}
            // onInputChange={this.handleInputChange}
            // getOptionSelected={this.handleSelected}
            renderInput={(params) => (
              <TextField {...params} placeholder='Search for Weather here' onChange={this.handleDebouncedTextChange} />
            )}
          />
        </span>
        <button type='button' className={classes.searchButton}>
          <Icons icon={solidSearch} />
        </button>
      </section>
    );
  }
}

export default connect(null, { fetchWeatherData })(SearchBar);

// {
/* <section className={classes.searchBar}>
<input type='text' className={classes.inputBar} />
<button type='button' className={classes.searchButton}>
  <FontAwesomeIcon icon={faSearch} />
</button>
</section> */
// }
