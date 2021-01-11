import { combineReducers } from 'redux';

import cardReducer from './cardSlice';
import weatherReducer from './weatherSlice';

const rootReducer = combineReducers({
  cards: cardReducer,
  weather: weatherReducer,
});

export default rootReducer;
