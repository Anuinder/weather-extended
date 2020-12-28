import { combineReducers } from 'redux';

// import otherReducer from './otherSlice';
import cardReducer from './cardSlice';

const rootReducer = combineReducers({
  cards: cardReducer,
  // others: otherReducer,
});

export default rootReducer;
