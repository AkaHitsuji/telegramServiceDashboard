import snapshot from 'reducers/snapshot';
import metadata from 'reducers/metadata';

import {combineReducers} from 'redux';

export default combineReducers({
  snapshot,
  metadata,
});
