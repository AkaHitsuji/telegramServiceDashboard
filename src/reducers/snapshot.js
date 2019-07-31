import { GET_SNAPSHOT } from 'actions/types';

export default function(state = [], action) {
  switch (action.type) {
  case GET_SNAPSHOT:
    return [...state, action.payload];
  default:
    return state;
  }
}
