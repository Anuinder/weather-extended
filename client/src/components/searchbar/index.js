import classes from './index.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
const SearchBar = () => {
  return (
    <section className={classes.searchBar}>
      <input type='text' className={classes.inputBar} />
      <button type='button' className={classes.searchButton}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </section>
  );
};

export default SearchBar;
