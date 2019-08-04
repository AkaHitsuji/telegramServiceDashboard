import {LOADING_TRUE, LOADING_FALSE} from 'actions/types';

const defaultState = {
  loading: null,
  authenticated: false,
};

export default function(state = defaultState, action) {
  const newState = state;

  switch (action.type) {
    case LOADING_TRUE:
      newState.loading = action.payload;
      return Object.assign({}, newState);
    case LOADING_FALSE:
      newState.loading = null;
      return Object.assign({}, newState);
    default:
      return state;
  }
}
