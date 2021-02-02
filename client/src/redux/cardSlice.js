import { DETAIL_CARD_CLOSE, DETAIL_CARD_OPEN } from './actionTypes';

// initial state
const initialState = {
  detailedCard: false,
};

/* reducer corresponding to detailed card */
const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DETAIL_CARD_OPEN': {
      return {
        ...state,
        detailedCard: true,
        id: action.payload,
      };
    }
    case 'DETAIL_CARD_CLOSE': {
      return {
        ...state,
        detailedCard: false,
      };
    }
    default:
      return state;
  }
};

export default cardReducer;
