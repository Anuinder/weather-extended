import { DETAIL_CARD_CLOSE, DETAIL_CARD_OPEN } from './actionTypes';

// action creators
const onDetailCardClose = () => ({
  type: DETAIL_CARD_CLOSE,
});

const onDetailCardOpen = () => ({
  type: DETAIL_CARD_OPEN,
});

export { onDetailCardClose, onDetailCardOpen };
