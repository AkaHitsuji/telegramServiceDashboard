import {LOADING_TRUE, LOADING_FALSE, AUTHENTICATED_TRUE, AUTHENTICATED_FALSE, LOGIN_FAIL} from 'actions/types';

const defaultState = {
  loading: null,
  authenticated: false,
  error: '',
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
    case AUTHENTICATED_TRUE:
      newState.authenticated = true;
      return Object.assign({}, newState);
    case AUTHENTICATED_FALSE:
      newState.authenticated = false;
      return Object.assign({}, newState);
    case LOGIN_FAIL:
      newState.error = action.payload;
      return Object.assign({}, newState);
    default:
      return state;
  }
}
